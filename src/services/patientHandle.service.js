// services/patientHandle.service.js
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { PatientHandleCreateInput } from "../validation/patientHandle.validation.js";
import { ZodError } from "zod";
import {
  JAKARTA_OFFSET_MS,
  toJakartaISOString,
  toUtcFromJakarta,
} from "../lib/timezone.js";

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
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

/* ============================================================
 *  Utilitas BradenQ dan Waktu
 * ============================================================ */
export function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2; // High risk
  if (bradenQ <= 14) return 3; // Moderate
  if (bradenQ <= 18) return 4; // Mild
  const fallback = 6;
  const envVal = Number(process.env.REPOSITION_HOURS_NO_RISK || fallback);
  return Number.isFinite(envVal) && envVal > 0 ? envVal : fallback;
}

export function calcNextRepositionTime(bradenQ, from = new Date()) {
  return new Date(from.getTime() + hoursForBradenQ(bradenQ) * 60 * 60 * 1000);
}

/* ============================================================
 *  Zona waktu & window hari/shift (WIB -> UTC)
 * ============================================================ */

/** Window shift berjalan dalam WIB (PAGI 08–16, SORE 16–24, MALAM 00–08) */
function getCurrentShiftWindow(now = new Date()) {
  const ms = now.getTime() + JAKARTA_OFFSET_MS; // ke WIB
  const z = new Date(ms);
  const y = z.getUTCFullYear();
  const m = z.getUTCMonth() + 1;
  const d = z.getUTCDate();
  const hh = z.getUTCHours();

  if (hh >= 8 && hh < 16) {
    return {
      shiftType: "PAGI",
      startUTC: toUtcFromJakarta({ y, m, d, hh: 8 }),
      endUTC:   toUtcFromJakarta({ y, m, d, hh: 16 }),
    };
  }
  if (hh >= 16 && hh < 24) {
    return {
      shiftType: "SORE",
      startUTC: toUtcFromJakarta({ y, m, d, hh: 16 }),
      endUTC:   toUtcFromJakarta({ y, m, d, hh: 24 }),
    };
  }
  return {
    shiftType: "MALAM",
    startUTC: toUtcFromJakarta({ y, m, d, hh: 0 }),
    endUTC:   toUtcFromJakarta({ y, m, d, hh: 8 }),
  };
}

/** Window HARI INI penuh (00:00–24:00 WIB) */
function getTodayJakartaWindow(now = new Date()) {
  const ms = now.getTime() + JAKARTA_OFFSET_MS;
  const z = new Date(ms);
  const y = z.getUTCFullYear();
  const m = z.getUTCMonth() + 1;
  const d = z.getUTCDate();
  const startUTC = toUtcFromJakarta({ y, m, d, hh: 0 });
  const endUTC   = toUtcFromJakarta({ y, m, d: d + 1, hh: 0 });
  return { startUTC, endUTC };
}

/** Konversi semua tanggal di patientHandle → WIB string */
export function mapHandleToWIB(handle) {
  if (!handle) return null;
  return {
    ...handle,
    createdAt: toJakartaISOString(handle.createdAt),
    updatedAt: toJakartaISOString(handle.updatedAt),
    nextRepositionTime: toJakartaISOString(handle.nextRepositionTime),
  };
}

/* ============================================================
 *  SERVICE CLASS
 * ============================================================ */
export class PatientHandleService {
  static async createPatientHandle(input) {
    try {
      const nurseId = input?.nurseIdFromAuth;
      if (!nurseId) {
        const e = new Error("Unauthorized: nurseId tidak ditemukan dari token");
        e.status = 401;
        throw e;
      }

      const {
        patientId: pidIn,
        patientName,
        bradenQ: bradenQInput,
        foto,
        dekubitus = false,
      } = PatientHandleCreateInput.parse(input);

      // Resolve patientId dari nama
      let patientId = pidIn;
      if (!patientId) {
        const name = (patientName || "").trim();
        const matches = await prismaClient.patient.findMany({
          where: { name },
          select: { id: true },
          take: 2,
        });
        if (!matches.length) {
          const e = new Error("Pasien tidak ditemukan");
          e.status = 404;
          throw e;
        }
        if (matches.length > 1) {
          const e = new Error("Nama pasien tidak unik. Gunakan patientId/nik.");
          e.status = 409;
          throw e;
        }
        patientId = matches[0].id;
      }

      // Ambil data pasien
      const patientRow = await prismaClient.patient.findUnique({
        where: { id: patientId },
        select: { id: true, name: true, bradenQ: true, roomName: true },
      });
      if (!patientRow) {
        const e = new Error("Pasien tidak ditemukan");
        e.status = 404;
        throw e;
      }

      const effectiveBradenQ =
        typeof bradenQInput === "number" ? bradenQInput : patientRow.bradenQ;
      if (!Number.isFinite(effectiveBradenQ)) {
        const e = new Error("Braden Q pasien tidak valid");
        e.status = 422;
        throw e;
      }

      const storedPath = await saveImageToRepo(patientId, foto);
      const roomName = patientRow.roomName ?? null;
      const nextRepositionTime = calcNextRepositionTime(
        effectiveBradenQ,
        new Date()
      );

      const { startUTC, endUTC } = getCurrentShiftWindow(new Date());

      const handle = await prismaClient.$transaction(async (tx) => {
        // Cegah ACTIVE oleh perawat lain di shift berjalan
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
          const e = new Error(
            "Pasien sedang ditangani perawat lain pada shift ini"
          );
          e.status = 409;
          throw e;
        }

        // Reactivate jika sudah ada pair
        const existing = await tx.patientHandle.findUnique({
          where: { patientId_nurseId: { patientId, nurseId } },
          select: { id: true },
        });

        if (existing) {
          return tx.patientHandle.update({
            where: { id: existing.id },
            data: {
              status: "ACTIVE",
              bradenQ: effectiveBradenQ,
              foto: storedPath ?? undefined,
              nextRepositionTime,
              roomName,
            },
            include: {
              patient: { select: { id: true, name: true } },
              nurse: { select: { id: true, name: true } },
            },
          });
        }

        // Buat baru
        return tx.patientHandle.create({
          data: {
            patientId,
            nurseId,
            bradenQ: effectiveBradenQ,
            foto: storedPath ?? null,
            status: "ACTIVE",
            nextRepositionTime,
            roomName,
            dekubitus,
          },
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
        });
      });

      return { handle: mapHandleToWIB(handle) };
    } catch (err) {
      if (err instanceof ZodError) {
        const e = new Error(
          err.errors?.map((x) => x.message).join("; ") || "Validasi gagal"
        );
        e.status = 422;
        throw e;
      }
      if (err?.code === "P2002") {
        const e = new Error(
          "Handle untuk pasangan patientId & nurseId tersebut sudah ada"
        );
        e.status = 409;
        throw e;
      }
      throw err;
    }
  }

  /* ============================================================
   *  Getters (dibatasi HARI INI / SHIFT, semua kirim WIB)
   * ============================================================ */

  static async listForUserContext({ nurseId, isHeadNurse }) {
    const now = new Date();
    const { startUTC: dayStart, endUTC: dayEnd } = getTodayJakartaWindow(now);
    const { startUTC: shiftStart, endUTC: shiftEnd } =
      getCurrentShiftWindow(now);

    const results = isHeadNurse
      ? await prismaClient.patientHandle.findMany({
          where: { updatedAt: { gte: dayStart, lt: dayEnd } },
          include: {
            nurse: { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
          },
          orderBy: { updatedAt: "desc" },
        })
      : await prismaClient.patientHandle.findMany({
          where: {
            nurseId,
            status: "ACTIVE",
            updatedAt: {
              gte: shiftStart < dayStart ? dayStart : shiftStart,
              lt: shiftEnd > dayEnd ? dayEnd : shiftEnd,
            },
          },
          include: {
            nurse: { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
          },
          orderBy: { updatedAt: "desc" },
        });

    return results.map(mapHandleToWIB);
  }

  static async getAllPatientHandles() {
    const { startUTC, endUTC } = getTodayJakartaWindow(new Date());
    const rows = await prismaClient.patientHandle.findMany({
      where: { updatedAt: { gte: startUTC, lt: endUTC } },
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    return rows.map(mapHandleToWIB);
  }

  static async getPatientHandleById(id) {
    const row = await prismaClient.patientHandle.findUnique({
      where: { id },
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
    });
    return mapHandleToWIB(row);
  }

  static async getPatientHandleByNurseId(nurseId) {
    const { startUTC, endUTC } = getTodayJakartaWindow(new Date());
    const ph = await prismaClient.patientHandle.findFirst({
      where: { nurseId, updatedAt: { gte: startUTC, lt: endUTC } },
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    if (!ph) {
      const e = new Error("Patient Handle not found (hari ini)");
      e.status = 404;
      throw e;
    }
    return mapHandleToWIB(ph);
  }

  static async getOwnLatest(nurseId) {
    const { startUTC, endUTC } = getTodayJakartaWindow(new Date());
    const ph = await prismaClient.patientHandle.findFirst({
      where: { nurseId, updatedAt: { gte: startUTC, lt: endUTC } },
      include: {
        nurse: { select: { id: true, name: true } },
        patient: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    if (!ph) {
      const e = new Error("Patient Handle not found (hari ini)");
      e.status = 404;
      throw e;
    }
    return mapHandleToWIB(ph);
  }

  static async getByIdForUserContext(id, { nurseId, isHeadNurse }) {
    const ph = await prismaClient.patientHandle.findUnique({
      where: { id },
      include: {
        nurse: { select: { id: true, name: true } },
        patient: { select: { name: true } },
      },
    });
    if (!ph) {
      const e = new Error("Patient Handle not found");
      e.status = 404;
      throw e;
    }
    if (!isHeadNurse && String(ph.nurse?.id || "") !== String(nurseId || "")) {
      const e = new Error("Forbidden");
      e.status = 403;
      throw e;
    }
    return mapHandleToWIB(ph);
  }
}
