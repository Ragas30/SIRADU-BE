import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

export class PatientHistoryService {
  static async getAllPatientHistories() {
    try {
      return await prismaClient.reposisiHistory.findMany({
        include: {
          patient: { select: { id: true, name: true } },
          nurse:   { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" }, 
      });
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getPatientHistoryByIdPatient(patientId) {
    try {
      // pastikan patient ada
      const patient = await prismaClient.patient.findUnique({
        where: { id: patientId },
        select: { id: true, name: true },
      });
      if (!patient) throw new ResponseError(404, "Patient not found");

      const histories = await prismaClient.reposisiHistory.findMany({
        where: { patientId },
        include: {
          patient: { select: { id: true, name: true } },
          nurse:   { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!histories.length) {
        throw new ResponseError(404, "Patient history not found");
      }
      return histories;
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  // by patient name (Patient.name)
  static async getPatientHistoryByPatientName(name) {
    try {
      const histories = await prismaClient.reposisiHistory.findMany({
        where: {
          patient: { name: { contains: name, mode: "insensitive" } },
        },
        include: {
          patient: { select: { id: true, name: true } },
          nurse:   { select: { id: true, name: true } },
        },
        orderBy: { Time: "desc" },
      });

      if (!histories.length) {
        throw new ResponseError(404, "Patient history not found");
      }
      return histories;
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}
