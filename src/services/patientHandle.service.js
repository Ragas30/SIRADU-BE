import { prismaClient } from "../app/database.js";
import { patientHandleValidation } from "../validation/patientHandle.validation.js";
import { Validation } from "../validation/validation.js";

export class PatientHandleService {
  static async createPatientHandle(request) {
    const patientHandleRequest = Validation.validate(patientHandleValidation.CREATE, request);

    const newPatientHandle = await this.PatientHandle.create({
      data: patientHandleRequest,
    });
    return newPatientHandle;
  }

  static async getAllPatientHandles() {
    return prismaClient.patientHandle.findMany();
  }

  static async getPatientHandleById(id) {
    const patientHandle = await prismaClient.patientHandle.findUnique({
      where: { id: id },
    });
    return patientHandle;
  }
}
