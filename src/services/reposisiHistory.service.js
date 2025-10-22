import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { calcNextRepositionTime } from "./patientHandle.service.js";

const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict");
const MAX_SIZE = 2 * 1024 * 1024;

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

/** Simpan foto reposisi (opsional), sama pola dengan patient handle */
async function saveRepositionImage(patientId, foto) {
  if (!foto?.data || !foto?.type) return null;
  const base64Prefix = `data:${foto.type};base64,`;
  if (!foto.data.startsWith(base64Prefix)) return null;

  const buf = Buffer.from(foto.data.replace(base64Prefix, ""), "base64");
  if (buf.length > MAX_SIZE) { const e = new Error("Ukuran foto maksimal 2MB"); e.status = 422; throw e; }

  await ensureDir(REPO_DIR);
  const ext = (foto.type.split("/")[1] || "img").toLowerCase();
  const file = `reposisi-${String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "")}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(REPO_DIR, file), buf, { encoding: "binary" });
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

export class ReposisiHistoryService {
  /**
   * Buat history reposisi & update nextRepositionTime di PatientHandle.
   * @param {{patientId:string, nurseIdFromAuth:string, bradenQ:number, position?:string, foto?:{type:string,size:number,data:string}}} payload
   */
  static async createReposition(payload) {
    const nurseId = payload?.nurseIdFromAuth;
    if (!nurseId) { const e = new Error("Unauthorized: nurseId tidak ditemukan dari token"); e.status = 401; throw e; }

    const patientId = String(payload.patientId || "");
    if (!patientId) { const e = new Error("patientId tidak valid"); e.status = 422; throw e; }

    const bradenQ = Number.parseInt(String(payload.bradenQ ?? ""), 10);
    if (!Number.isFinite(bradenQ) || bradenQ < 1 || bradenQ > 23) { const e = new Error("bradenQ tidak valid (1–23)"); e.status = 422; throw e; }

    const position = String(payload.position || "");
    const storedPath = await saveRepositionImage(patientId, payload.foto);

    // transaksi: create history + update handle
    const result = await prismaClient.$transaction(async (tx) => {
      // create history
      const history = await tx.reposisiHistory.create({
        data: {
          patientId,
          nurseId,
          bradenQ,
          position,
          foto: storedPath ?? null,
        },
      });

      // hitung next time & update semua handle ACTIVE pasien tsb (atau batasi ke pair nurseId jika kamu mau)
      const nextTime = calcNextRepositionTime(bradenQ, new Date());
      await tx.patientHandle.updateMany({
        where: { patientId, status: "ACTIVE" },
        data: { bradenQ, nextRepositionTime: nextTime, updatedAt: new Date() },
      });

      return { history, nextRepositionTime: nextTime };
    });

    return result;
  }
}
