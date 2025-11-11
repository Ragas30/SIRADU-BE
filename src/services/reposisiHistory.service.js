import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prismaClient } from "../app/database.js";
import { ReposisiHistoryCreateInput } from "../validation/reposisiHistory.validation.js";
import { toJakartaISOString } from "../lib/timezone.js";

const REPO_DIR = path.join(process.cwd(), "assets", "reposisi_pict");
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

async function saveImageToRepo(patientId, foto) {
  if (!foto?.data || !foto?.type) return null;
  const base64Prefix = `data:${foto.type};base64,`;
  if (!foto.data.startsWith(base64Prefix)) return null;

  const buf = Buffer.from(foto.data.replace(base64Prefix, ""), "base64");
  if (buf.length > MAX_SIZE) {
    const e = new Error("Ukuran foto maksimal 2MB");
    e.status = 422; throw e;
  }

  await ensureDir(REPO_DIR);
  const ext = (foto.type.split("/")[1] || "img").toLowerCase();
  const safePid = String(patientId || "unknown").replace(/[^a-zA-Z0-9_-]/g, "");
  const file = `reposisi-${safePid}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(REPO_DIR, file), buf, { encoding: "binary" });
  return path.join("assets", "reposisi_pict", file).replace(/\\/g, "/");
}

/** Interval reposisi (BradenQ) → jam */
function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2;     // High risk
  if (bradenQ <= 14) return 3;     // Moderate
  if (bradenQ <= 18) return 4;     // Mild
  const fallback = 6;              // No risk
  const envVal = Number(process.env.REPOSITION_HOURS_NO_RISK || fallback);
  return Number.isFinite(envVal) && envVal > 0 ? envVal : fallback;
}
function calcNextRepositionTime(bradenQ, from = new Date()) {
  return new Date(from.getTime() + hoursForBradenQ(bradenQ) * 60 * 60 * 1000);
}

export class ReposisiHistoryService {
  static async createReposition(input) {
    const {
      patientId,
      position,
      bradenQ,
      dekubitus,
      foto,
      nurseIdFromAuth,
    } = ReposisiHistoryCreateInput.parse(input);

    // pastikan ada handle ACTIVE untuk pair ini
    const handle = await prismaClient.patientHandle.findFirst({
      where: { patientId, nurseId: nurseIdFromAuth, status: "ACTIVE" },
      include: {
        patient: { select: { id: true, name: true, roomName: true } },
        nurse:   { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!handle) {
      const e = new Error("Handle ACTIVE untuk pasien & perawat ini tidak ditemukan");
      e.status = 403; throw e;
    }

    const effectiveBradenQ = bradenQ ?? handle.bradenQ;
    const nextRepositionTime = calcNextRepositionTime(effectiveBradenQ, new Date());
    const storedPath = await saveImageToRepo(patientId, foto);

    // roomName dari Patient (sumber kebenaran)
    const roomName = handle.patient?.roomName ?? null;

    const { history } = await prismaClient.$transaction(async (tx) => {
      // 1) catat history (schema: foto, dekubitus REQUIRED)
      const history = await tx.reposisiHistory.create({
        data: {
          patientId,
          nurseId: nurseIdFromAuth,
          bradenQ: effectiveBradenQ,
          foto: storedPath ?? null,
          position,
          dekubitus,            // REQUIRED by schema
          roomName,             // jejak ruangan saat itu
        },
      });

      // 2) update handle: bradenQ (jika dikirim) + nextRepositionTime + roomName
      await tx.patientHandle.update({
        where: { id: handle.id },
        data: {
          bradenQ: effectiveBradenQ,
          nextRepositionTime,
          roomName,
        },
      });

      return { history };
    });

    return { history, nextRepositionTime: toJakartaISOString(nextRepositionTime) };
  }
}
