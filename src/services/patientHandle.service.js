import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { PatientHandleCreateInput } from "../validation/patientHandle.validation.js";
import { ZodError } from "zod";

const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict");
const MAX_SIZE = 2 * 1024 * 1024;
const SHIFT_LOCK_MS = 8 * 60 * 60 * 1000; // 8 jam

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

/** Simpan foto image base64 (png/jpg/jpeg/webp/heic) */
async function saveImageToRepo(patientId, foto) {
  if (!foto?.data || !foto?.type) return null;
  const base64Prefix = `data:${foto.type};base64,`;
  if (!foto.data.startsWith(base64Prefix)) return null;

  const buf = Buffer.from(foto.data.replace(base64Prefix, ""), "base64");
  if (buf.length > MAX_SIZE) { const e = new Error("Ukuran foto maksimal 2MB"); e.status = 422; throw e; }

  await ensureDir(REPO_DIR);
  const ext = (foto.type.split("/")[1] || "img").toLowerCase();
  const file = `patient-${String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "")}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(REPO_DIR, file), buf, { encoding: "binary" });
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

/** ====== REPOSISI INTERVAL (berdasarkan BradenQ) ====== */
export function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2;     // High risk
  if (bradenQ <= 14) return 3;     // Moderate
  if (bradenQ <= 18) return 4;     // Mild
  const fallback = 6;              // No Risk default 6 jam
  const envVal = Number(process.env.REPOSITION_HOURS_NO_RISK || fallback);
  return Number.isFinite(envVal) && envVal > 0 ? envVal : fallback;
}
export function calcNextRepositionTime(bradenQ, from = new Date()) {
  const hours = hoursForBradenQ(bradenQ);
  return new Date(from.getTime() + hours * 60 * 60 * 1000);
}
/** ===================================================== */

export class PatientHandleService {
  static async createPatientHandle(input) {
    try {
      const nurseId = input?.nurseIdFromAuth;
      if (!nurseId) { const e = new Error("Unauthorized: nurseId tidak ditemukan dari token"); e.status = 401; throw e; }

      const { patientId: pid, patientName, bradenQ, foto, status, needsManualReposition } = PatientHandleCreateInput.parse(input);

      // resolve patientId
      let patientId = pid;
      if (!patientId) {
        const name = (patientName || "").trim();
        if (!name) { const e = new Error("Harus menyertakan patientId atau patientName"); e.status = 422; throw e; }

        const matches = await prismaClient.patient.findMany({ where: { name }, select: { id: true }, take: 2 });
        if (matches.length === 0) { const e = new Error("Pasien tidak ditemukan"); e.status = 404; throw e; }
        if (matches.length > 1) { const e = new Error("Nama pasien tidak unik. Gunakan patientId/nik."); e.status = 409; throw e; }
        patientId = matches[0].id;
      }

      const storedPath = await saveImageToRepo(patientId, foto);

      const { handle, history } = await prismaClient.$transaction(async (tx) => {
        // shift-lock 8 jam untuk handle ACTIVE bagi pasien ini
        const now = Date.now();
        const lockSince = new Date(now - SHIFT_LOCK_MS);

        const recentActive = await tx.patientHandle.findFirst({
          where: { patientId, status: "ACTIVE", createdAt: { gte: lockSince } },
          select: { id: true, nurseId: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        });

        if (recentActive && String(recentActive.nurseId) !== String(nurseId)) {
          const releaseAt = new Date(recentActive.createdAt.getTime() + SHIFT_LOCK_MS);
          const e = new Error(`Pasien sedang dikunci 1 shift (8 jam) oleh perawat lain. Bisa dipilih lagi setelah: ${releaseAt.toISOString()}`);
          e.status = 409; throw e;
        }

        // tentukan nextRepositionTime saat assign jika perlu reposisi manual
        const nextRepositionTime = input?.needsManualReposition ? calcNextRepositionTime(bradenQ, new Date()) : null;

        const handle = await tx.patientHandle.create({
          data: {
            patientId,
            nurseId,
            bradenQ,
            foto: storedPath ?? null,
            status: status ?? "ACTIVE",
            nextRepositionTime, // NEW
          },
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
        });

        // catat history awal (optional)
        const history = await tx.reposisiHistory.create({
          data: { patientId, nurseId, bradenQ, foto: storedPath ?? null, position: "" },
        });

        return { handle, history };
      });

      return { handle, history };
    } catch (err) {
      if (err instanceof ZodError) { const e = new Error(err.errors?.map((x) => x.message).join("; ") || "Validasi gagal"); e.status = 422; throw e; }
      if (err?.code === "P2002") { const e = new Error("Handle untuk pasangan patientId & nurseId tersebut sudah ada"); e.status = 409; throw e; }
      throw err;
    }
  }

  // legacy (tetap)
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

  // safe variants
  static async listForUserContext({ nurseId, isHeadNurse }) {
    const where = isHeadNurse ? {} : { nurseId };
    return prismaClient.patientHandle.findMany({
      where,
      include: { nurse: { select: { id: true, name: true } }, patient: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
  static async getByIdForUserContext(id, { nurseId, isHeadNurse }) {
    const ph = await prismaClient.patientHandle.findUnique({
      where: { id },
      include: { nurse: { select: { id: true, name: true } }, patient: { select: { name: true } } },
    });
    if (!ph) { const e = new Error("Patient Handle not found"); e.status = 404; throw e; }
    if (!isHeadNurse && String(ph.nurse?.id || "") !== String(nurseId || "")) { const e = new Error("Forbidden"); e.status = 403; throw e; }
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
