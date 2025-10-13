import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { PasienValidation } from "../validation/pasien.validation.js";
import { Validation } from "../validation/validation.js";

export class PasienService {
  static async createPasien(request) {
    const pasienRequest = Validation.validate(PasienValidation.CREATE, request);

    const existing = await prismaClient.patient.findUnique({
      where: { nik: pasienRequest.nik },
    });

    if (existing) {
      throw new ResponseError(400, "Pasien dengan NIK ini sudah ada");
    }

    const newPasien = await prismaClient.patient.create({
      data: pasienRequest,
    });

    return newPasien;
  }

  static async getAllPasiens() {
    
    return prismaClient.patient.findMany();
  }

  static async getPasienById(id) {
    const pasien = await prismaClient.patient.findFirst({
      where: { id },
    });

    if (!pasien) throw new ResponseError(404, "Pasien tidak ditemukan");
    return pasien;
  }

  static async updatePasien(id, request) {
    const pasienRequest = Validation.validate(PasienValidation.UPDATE_BY_ID, request);

    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    const updated = await prismaClient.patient.update({
      where: { id },
      data: pasienRequest,
    });

    return updated;
  }

  static async deletePasien(id) {
    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    await prismaClient.patient.delete({ where: { id } });
  }
}
