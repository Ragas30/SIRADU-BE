import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { PasienValidation } from "../validation/pasien.validation.js";
import { Validation } from "../validation/validation.js";

export class PasienService {
  static async createPasien(request) {
    const pasienRequest = Validation.validate(PasienValidation.CREATE, request);

    const pasien = await prismaClient.pasien.findUnique({
      where: { nik: pasienRequest.nik },
    });

    if (pasien) {
      throw new ResponseError(400, "Pasien Dengan NIK ini sudah ada");
    }
    const newPasien = await prismaClient.pasien.create({
      data: pasienRequest,
    });
    return newPasien;
  }

  static async getAllPasiens() {
    const pasiens = await prismaClient.pasien.findMany();
    return pasiens;
  }
  static async getPasienById(id) {
    const pasien = await prismaClient.pasien.findUnique({
      where: { id },
    });
    return pasien;
  }

  static async updatePasien(id, request) {
    const pasienRequest = Validation.validate(PasienValidation.UPDATE, request);
    const pasien = await prismaClient.pasien.findUnique({
      where: { id },
    });
    if (!pasien) {
      throw new ResponseError(404, "Pasien Tidak Ditemukan");
    }
    const updatedPasien = await prismaClient.pasien.update({
      where: { id },
      data: pasienRequest,
    });
    return updatedPasien;
  }
}
