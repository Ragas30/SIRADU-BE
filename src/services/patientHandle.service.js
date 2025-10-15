import { tr } from "zod/locales";
import { prismaClient } from "../app/database.js";
import { includes } from "zod";

export class PatientHandleService {
  static async createPatientHandle(input) {
    const { patientId: pid, patientName, bradenQ, foto, status, nurseIdFromAuth } = input;

    console.log("prismaClient keys:", Object.keys(prismaClient));

    // 0) Guard: nurseId wajib dari auth
    if (!nurseIdFromAuth) {
      const e = new Error("Unauthorized: nurseId tidak ditemukan dari token");
      e.status = 401;
      throw e;
    }
    const nurseId = nurseIdFromAuth;

    // 1) Resolve patientId jika belum ada
    let patientId = pid;
    if (!patientId) {
      const name = patientName?.trim();
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

    try {
      // 2) Transaksi atomic: handle + history
      const { handle, history } = await prismaClient.$transaction(async (tx) => {
        const handle = await tx.patientHandle.create({
          data: {
            patientId,
            nurseId,
            bradenQ,
            foto: foto ?? null,
            status: status ?? "ACTIVE",
          },
          include: { patient: true, nurse: true },
        });

        const history = await tx.reposisiHistory.create({
          data: {
            patientId,
            nurseId,
            bradenQ,
            foto: foto ?? null,
            position: "HANDLE_CREATED",
          },
        });

        return { handle, history };
      });

      return { handle, history };
    } catch (err) {
      // 3) Mapping error unik @@unique([patientId, nurseId])
      // if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      //   const e = new Error("PatientHandle untuk pasien & perawat ini sudah ada.");
      //   e.status = 409;
      //   throw e;
      // }
      throw err;
    }
  }

  static async getAllPatientHandles() {
    return prismaClient.patientHandle.findMany({ include: { nurse: { select: { name: true } }, patient: { select: { name: true } } } });
  }

  static async getPatientHandleById(id) {
    return prismaClient.patientHandle.findUnique({ where: { id }, include: { nurse: { select: { name: true } }, patient: { select: { name: true } } } });
  }
}
