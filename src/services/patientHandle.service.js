// services/patientHandle.service.js
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { PatientHandleCreateInput } from "../validation/patientHandle.validation.js";
import { ZodError } from "zod";

/* ============================================================
 *  Penyimpanan foto (repo lokal)
 * ============================================================ */
const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict");
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

/** Simpan image base64 (png/jpg/jpeg/webp/heic) ke folder repo */
async function saveImageToRepo(patientId, foto) {
  if (!foto?.data || !foto?.type) return null;

  const base64Prefix = `data:${foto.type};base64,`;
  if (!foto.data.startsWith(base64Prefix)) return null;

  const buf = Buffer.from(foto.data.replace(base64Prefix, ""), "base64");
  if (buf.length > MAX_SIZE) {
    const e = new Error("Ukuran foto maksimal 2MB"); e.status = 422; throw e;
  }

  await ensureDir(REPO_DIR);
  const ext = (foto.type.split("/")[1] || "img").toLowerCase();
  const safePid = String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "");
  const file = `patient-${safePid}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

  await fs.writeFile(path.join(REPO_DIR, file), buf, { encoding: "binary" });
  // Kembalikan relative path agar bisa disajikan statis
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

/* ============================================================
 *  Interval reposisi (berdasarkan BradenQ)
 * ============================================================ */
export function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2; // High risk
  if (bradenQ <= 14) return 3; // Moderate
  if (bradenQ <= 18) return 4; // Mild
  // No Risk → pakai env atau fallback 6 jam
  const fallback = 6;
  const envVal = Number(process.env.REPOSITION_HOURS_NO_RISK || fallback);
  return Number.isFinite(envVal) && envVal > 0 ? envVal : fallback;
}

export function calcNextRepositionTime(bradenQ, from = new Date()) {
  return new Date(from.getTime() + hoursForBradenQ(bradenQ) * 60 * 60 * 1000);
}

/* ============================================================
 *  Helper Shift (WIB/Asia-Jakarta, UTC+7) — TANPA ubah schema
 *  - Kita definisikan "aktif di shift" = row dengan updatedAt
 *    berada di dalam jendela shift saat ini (WIB).
 *  - Shift: 08–16 (PAGI), 16–24 (SORE), 00–08 (MALAM).
 * ============================================================ */
const JAKARTA_OFFSET_MIN = 7 * 60; // Jakarta tidak memiliki DST

// Ubah komponen waktu Jakarta → Date UTC
function toUtcFromJakarta({ y, m, d, hh, mm = 0, ss = 0 }) {
  // Buat waktu "Jakarta" dalam zona UTC basis, lalu kurangi 7 jam => UTC real
  const jakartaMs = Date.UTC(y, m - 1, d, hh, mm, ss);
  return new Date(jakartaMs - JAKARTA_OFFSET_MIN * 60 * 1000);
}

/** Ambil window shift aktif berdasarkan "sekarang" (WIB) → kembalikan batas dalam UTC */
function getCurrentShiftWindow(now = new Date()) {
  // Geser waktu sekarang ke WIB dengan menambahkan offset
  const ms = now.getTime() + JAKARTA_OFFSET_MIN * 60 * 1000;
  const z = new Date(ms);
  const y = z.getUTCFullYear();
  const m = z.getUTCMonth() + 1;
  const d = z.getUTCDate();
  const hh = z.getUTCHours();

  // PAGI: 08:00–16:00 WIB
  if (hh >= 8 && hh < 16) {
    return {
      shiftType: "PAGI",
      startUTC: toUtcFromJakarta({ y, m, d, hh: 8 }),
      endUTC:   toUtcFromJakarta({ y, m, d, hh: 16 }),
    };
  }
  // SORE: 16:00–24:00 WIB
  if (hh >= 16 && hh < 24) {
    return {
      shiftType: "SORE",
      startUTC: toUtcFromJakarta({ y, m, d, hh: 16 }),
      endUTC:   toUtcFromJakarta({ y, m, d, hh: 24 }),
    };
  }
  // MALAM: 00:00–08:00 WIB
  return {
    shiftType: "MALAM",
    startUTC: toUtcFromJakarta({ y, m, d, hh: 0 }),
    endUTC:   toUtcFromJakarta({ y, m, d, hh: 8 }),
  };
}

/* ============================================================
 *  SERVICE
 * ============================================================ */
export class PatientHandleService {
  /**
   * Binding per shift (tanpa ubah DB):
   * - Perawat cukup kirim patientId atau patientName (+ foto opsional)
   * - bradenQ & roomName diambil dari Patient (bradenQ bisa override bila dikirim)
   * - Hitung nextRepositionTime dari bradenQ
   * - Lock per shift: block jika ada perawat lain aktif di window shift (updatedAt dalam window)
   * - Reactivate: jika pair (patientId, nurseId) sudah ada → update row (updatedAt otomatis jadi "cap" shift aktif)
   * - Tidak membuat ReposisiHistory pada tahap binding
   */
  static async createPatientHandle(input) {
    try {
      const nurseId = input?.nurseIdFromAuth;
      if (!nurseId) { const e = new Error("Unauthorized: nurseId tidak ditemukan dari token"); e.status = 401; throw e; }

      // Validasi payload minimal (sesuai validation terbaru)
      const {
        patientId: pidIn,
        patientName,
        bradenQ: bradenQInput, // opsional
        foto,                   // opsional
        dekubitus = false,      // default saat create pertama kali
      } = PatientHandleCreateInput.parse(input);

      // Resolve patientId dari patientName jika perlu (strict unique-by-name)
      let patientId = pidIn;
      if (!patientId) {
        const name = (patientName || "").trim();
        const matches = await prismaClient.patient.findMany({ where: { name }, select: { id: true }, take: 2 });
        if (!matches.length) { const e = new Error("Pasien tidak ditemukan"); e.status = 404; throw e; }
        if (matches.length > 1) { const e = new Error("Nama pasien tidak unik. Gunakan patientId/nik."); e.status = 409; throw e; }
        patientId = matches[0].id;
      }

      // Ambil referensi dari Patient (sumber kebenaran)
      const patientRow = await prismaClient.patient.findUnique({
        where: { id: patientId },
        select: { id: true, name: true, bradenQ: true, roomName: true },
      });
      if (!patientRow) { const e = new Error("Pasien tidak ditemukan"); e.status = 404; throw e; }

      // BradenQ efektif (dari input kalau ada, kalau tidak pakai dari Patient)
      const effectiveBradenQ = typeof bradenQInput === "number" ? bradenQInput : patientRow.bradenQ;
      if (!Number.isFinite(effectiveBradenQ)) {
        const e = new Error("Braden Q pasien tidak valid"); e.status = 422; throw e;
      }

      const storedPath = await saveImageToRepo(patientId, foto);
      const roomName = patientRow.roomName ?? null;
      const nextRepositionTime = calcNextRepositionTime(effectiveBradenQ, new Date());

      // Window shift aktif (WIB) – untuk lock & penentuan "aktif pada shift ini"
      const { startUTC, endUTC } = getCurrentShiftWindow(new Date());

      const handle = await prismaClient.$transaction(async (tx) => {
        // 🔒 LOCK PER SHIFT:
        // Cek apakah ADA handle ACTIVE utk pasien ini yang dipegang perawat LAIN
        // dalam window shift saat ini (updatedAt ∈ [startUTC, endUTC))
        const otherActive = await tx.patientHandle.findFirst({
          where: {
            patientId,
            status: "ACTIVE",
            nurseId: { not: nurseId },
            updatedAt: { gte: startUTC, lt: endUTC },
          },
          select: { id: true },
        });
        if (otherActive) {
          const e = new Error("Pasien sedang ditangani perawat lain pada shift ini"); e.status = 409; throw e;
        }

        // Reactivate jika pasangan (patientId, nurseId) sudah ada (gunakan @@unique([patientId, nurseId]))
        const existing = await tx.patientHandle.findUnique({
          where: { patientId_nurseId: { patientId, nurseId } },
          select: { id: true },
        });

        if (existing) {
          // Update akan memantik updatedAt = now (→ dianggap aktif pada shift berjalan)
          return tx.patientHandle.update({
            where: { id: existing.id },
            data: {
              status: "ACTIVE",
              bradenQ: effectiveBradenQ,
              foto: storedPath ?? undefined, // hanya update jika ada foto baru
              nextRepositionTime,
              roomName,                       // sinkron dengan Patient terbaru
            },
            include: {
              patient: { select: { id: true, name: true } },
              nurse:   { select: { id: true, name: true } },
            },
          });
        }

        // Create baru untuk pair ini (pertama kali)
        return tx.patientHandle.create({
          data: {
            patientId,
            nurseId,
            bradenQ: effectiveBradenQ,
            foto: storedPath ?? null,
            status: "ACTIVE",
            nextRepositionTime,
            roomName,
            dekubitus, // wajib di schema
          },
          include: {
            patient: { select: { id: true, name: true } },
            nurse:   { select: { id: true, name: true } },
          },
        });
      });

      // Tidak membuat ReposisiHistory pada tahap binding
      return { handle };
    } catch (err) {
      if (err instanceof ZodError) {
        const e = new Error(err.errors?.map((x) => x.message).join("; ") || "Validasi gagal");
        e.status = 422; throw e;
      }
      if (err?.code === "P2002") {
        const e = new Error("Handle untuk pasangan patientId & nurseId tersebut sudah ada");
        e.status = 409; throw e;
      }
      throw err;
    }
  }

  /* ============================================================
   *  Legacy getters (tidak diubah)
   * ============================================================ */
  static async getAllPatientHandles() {
    return prismaClient.patientHandle.findMany({
      include: { nurse: { select: { name: true } }, patient: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getPatientHandleById(id) {
    return prismaClient.patientHandle.findUnique({
      where: { id },
      include: { nurse: { select: { name: true } }, patient: { select: { name: true } } },
    });
  }

  static async getPatientHandleByNurseId(nurseId) {
    const ph = await prismaClient.patientHandle.findFirst({
      where: { nurseId },
      include: { nurse: { select: { name: true } }, patient: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    if (!ph) { const e = new Error("Patient Handle not found"); e.status = 404; throw e; }
    return ph;
  }

  /* ============================================================
   *  Safe variants
   *  - Perawat biasa: hanya lihat handle yang aktif di shift saat ini
   *  - Kepala perawat: bisa lihat semua (tanpa filter window)
   * ============================================================ */
  static async listForUserContext({ nurseId, isHeadNurse }) {
    const { startUTC, endUTC } = getCurrentShiftWindow(new Date());

    const where = isHeadNurse
      ? {}
      : { nurseId, status: "ACTIVE", updatedAt: { gte: startUTC, lt: endUTC } };

    return prismaClient.patientHandle.findMany({
      where,
      include: { nurse: { select: { id: true, name: true } }, patient: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getByIdForUserContext(id, { nurseId, isHeadNurse }) {
    const ph = await prismaClient.patientHandle.findUnique({
      where: { id },
      include: { nurse: { select: { id: true, name: true } }, patient: { select: { name: true } } },
    });
    if (!ph) { const e = new Error("Patient Handle not found"); e.status = 404; throw e; }
    if (!isHeadNurse && String(ph.nurse?.id || "") !== String(nurseId || "")) {
      const e = new Error("Forbidden"); e.status = 403; throw e;
    }
    return ph;
  }

  static async getOwnLatest(nurseId) {
    const ph = await prismaClient.patientHandle.findFirst({
      where: { nurseId },
      include: { nurse: { select: { id: true, name: true } }, patient: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    if (!ph) { const e = new Error("Patient Handle not found"); e.status = 404; throw e; }
    return ph;
  }
}
