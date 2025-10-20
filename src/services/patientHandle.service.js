// services/patientHandle.service.js
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { PatientHandleCreateInput } from "../validation/patientHandle.validation.js";
import { ZodError } from "zod";

const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict"); // folder tujuan simpan file
const MAX_SIZE = 2 * 1024 * 1024; // 2MB (double check walau sudah divalidasi zod)

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function savePdfToRepo(patientId, foto) {
  if (!foto?.data || foto?.type !== "application/pdf") return null;

  // bersihkan prefix data URL
  const base64 = foto.data.replace(/^data:application\/pdf;base64,/, "");
  const buf = Buffer.from(base64, "base64");

  // keamanan ekstra: cek ukuran (walau zod sudah memvalidasi)
  if (buf.length > MAX_SIZE) {
    const e = new Error("Ukuran foto maksimal 2MB");
    e.status = 422;
    throw e;
  }

  // Pastikan folder ada
  await ensureDir(REPO_DIR);

  // Nama file aman & unik
  const stamp = Date.now();
  const rand = crypto.randomBytes(6).toString("hex");
  const safePid = String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "");
  const fileName = `patient-${safePid}-${stamp}-${rand}.pdf`;
  const fullPath = path.join(REPO_DIR, fileName);

  // Tulis file ke disk
  await fs.writeFile(fullPath, buf, { encoding: "binary" });

  // Simpan path relatif (biar gampang di-serve statis)
  const relativePath = path.join("assets", "reposisi_pict", fileName).replace(/\\/g, "/");
  return relativePath;
}

export class PatientHandleService {
  static async createPatientHandle(input) {
    try {
      // 0) Guard nurse dari token
      const nurseId = input?.nurseIdFromAuth;
      if (!nurseId) {
        const e = new Error("Unauthorized: nurseId tidak ditemukan dari token");
        e.status = 401;
        throw e;
      }

      // 1) Validasi body pakai Zod
      const { patientId: pid, patientName, bradenQ, foto, status } = PatientHandleCreateInput.parse(input);

      // 2) Resolve patientId bila tidak dikirim
      let patientId = pid;
      if (!patientId) {
        const name = (patientName || "").trim();
        if (!name) {
          const e = new Error("Harus menyertakan patientId atau patientName");
          e.status = 422;
          throw e;
        }
        const matches = await prismaClient.patient.findMany({
          where: { name },
          select: { id: true },
          take: 2,
        });

        if (matches.length === 0) {
          const e = new Error("Pasien dengan nama tersebut tidak ditemukan");
          e.status = 404;
          throw e;
        }
        if (matches.length > 1) {
          const e = new Error("Nama pasien tidak unik. Mohon pilih pasien yang tepat (gunakan patientId/nik).");
          e.status = 409;
          throw e;
        }
        patientId = matches[0].id;
      }

      // 3) Simpan file ke folder (kalau ada foto)
      const storedPath = await savePdfToRepo(patientId, foto); // null jika tidak ada foto

      // 4) Transaksi: create handle + history
      const { handle, history } = await prismaClient.$transaction(async (tx) => {
        const handle = await tx.patientHandle.create({
          data: {
            patientId,
            nurseId,
            bradenQ,
            foto: storedPath ?? null, // simpan path relatif
            status: status ?? "ACTIVE",
          },
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
        });

        const history = await tx.reposisiHistory.create({
          data: {
            patientId,
            nurseId,
            bradenQ,
            foto: storedPath ?? null, // simpan path relatif
            position: "",
          },
        });

        return { handle, history };
      });

      return { handle, history };
    } catch (err) {
      if (err instanceof ZodError) {
        const e = new Error(err.errors?.map((x) => x.message).join("; ") || "Validasi gagal");
        e.status = 422;
        throw e;
      }
      // if (err?.code === "P2002") {
      //   const e = new Error("PatientHandle untuk pasien & perawat ini sudah ada.");
      //   e.status = 409;
      //   throw e;
      // }
      throw err;
    }
  }

  static async getAllPatientHandles() {
    return prismaClient.patientHandle.findMany({
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getPatientHandleById(id) {
    return prismaClient.patientHandle.findUnique({
      where: { id },
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
    });
  }

  static async getPatientHandleByNurseId(nurseId) {
    const ph = await prismaClient.patientHandle.findFirst({
      where: { nurseId },
      include: {
        nurse: { select: { name: true } },
        patient: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!ph) {
      const e = new Error("Patient Handle not found");
      e.status = 404;
      throw e;
    }
    return ph;
  }
}
