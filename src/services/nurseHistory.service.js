import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

export class NurseHistoryService {
  static async getAllNurseHistories() {
    try {
      return await prismaClient.reposisiHistory.findMany({
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" },
      });
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getNurseHistoryByIdNurse(nurseId) {
    try {
      // pastikan nurse ada
      const nurse = await prismaClient.user.findUnique({
        where: { id: nurseId },
        select: { id: true, name: true },
      });
      if (!nurse) throw new ResponseError(404, "Nurse not found");

      const histories = await prismaClient.reposisiHistory.findMany({
        where: { nurseId },
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!histories.length) {
        throw new ResponseError(404, "Nurse history not found");
      }
      return histories;
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  // by nurse name (User.name)
  static async getNurseHistoryByName(name) {
    try {
      const histories = await prismaClient.reposisiHistory.findMany({
        where: {
          nurse: { name: { contains: name, mode: "insensitive" } },
        },
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!histories.length) {
        throw new ResponseError(404, "Nurse history not found");
      }
      return histories;
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}

