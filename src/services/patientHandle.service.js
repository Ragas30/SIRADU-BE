import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { PatientHandleCreateInput } from "../validation/patientHandle.validation.js";
import { ZodError } from "zod";

const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict");
const MAX_SIZE = 2 * 1024 * 1024;

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

async function savePdfToRepo(patientId, foto) {
  if (!foto?.data || foto?.type !== "application/pdf") return null;
  const base64 = foto.data.replace(/^data:application\/pdf;base64,/, "");
  const buf = Buffer.from(base64, "base64");
  if (buf.length > MAX_SIZE) { const e = new Error("Ukuran foto maksimal 2MB"); e.status = 422; throw e; }
  await ensureDir(REPO_DIR);
  const file = `patient-${String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "")}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.pdf`;
  await fs.writeFile(path.join(REPO_DIR, file), buf, { encoding: "binary" });
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

export class PatientHandleService {
  static async createPatientHandle(input) {
    try {
      const nurseId = input?.nurseIdFromAuth;
      if (!nurseId) { const e = new Error("Unauthorized: nurseId tidak ditemukan dari token"); e.status = 401; throw e; }

      const { patientId: pid, patientName, bradenQ, foto, status } = PatientHandleCreateInput.parse(input);

      let patientId = pid;
      if (!patientId) {
        const name = (patientName || "").trim();
        if (!name) { const e = new Error("Harus menyertakan patientId atau patientName"); e.status = 422; throw e; }
        const matches = await prismaClient.patient.findMany({ where: { name }, select: { id: true }, take: 2 });
        if (matches.length === 0) { const e = new Error("Pasien tidak ditemukan"); e.status = 404; throw e; }
        if (matches.length > 1) { const e = new Error("Nama pasien tidak unik. Gunakan patientId/nik."); e.status = 409; throw e; }
        patientId = matches[0].id;
      }

      const storedPath = await savePdfToRepo(patientId, foto);

      const { handle, history } = await prismaClient.$transaction(async (tx) => {
        const handle = await tx.patientHandle.create({
          data: { patientId, nurseId, bradenQ, foto: storedPath ?? null, status: status ?? "ACTIVE" },
          include: { patient: { select: { id: true, name: true } }, nurse: { select: { id: true, name: true } } },
        });
        const history = await tx.reposisiHistory.create({ data: { patientId, nurseId, bradenQ, foto: storedPath ?? null, position: "" } });
        return { handle, history };
      });

      return { handle, history };
    } catch (err) {
      if (err instanceof ZodError) { const e = new Error(err.errors?.map((x) => x.message).join("; ") || "Validasi gagal"); e.status = 422; throw e; }
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
