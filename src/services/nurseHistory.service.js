import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

export class NurseHistoryService {
  static async getAllNurseHistories() {
    try {
      const rows = await prismaClient.reposisiHistory.findMany({
        include: {
          nurse: { select: { name: true } },
          patient: { select: { name: true } },
        },
        orderBy: { Time: "desc" },
      });

      return {
        data: rows,
        total: rows.length,
      };
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getNurseHistoryByIdNurse(nurseId) {
    try {
      // pastikan nurse ada
      const nurse = await prismaClient.nurse.findUnique({
        where: { id: nurseId },
        select: { id: true, name: true },
      });
      if (!nurse) throw new ResponseError(404, "Nurse not found");

      const rows = await prismaClient.reposisiHistory.findMany({
        where: { nurseId },
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!rows.length) {
        throw new ResponseError(404, "Nurse history not found");
      }

      return {
        data: rows,
        total: rows.length,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  // by nurse name (Nurse.name)
  static async getNurseHistoryByNurseName(name) {
    try {
      const rows = await prismaClient.reposisiHistory.findMany({
        where: {
          nurse: { name: { contains: name, mode: "insensitive" } },
        },
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!rows.length) {
        throw new ResponseError(404, "Nurse history not found");
      }

      return {
        data: rows,
        total: rows.length,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}
