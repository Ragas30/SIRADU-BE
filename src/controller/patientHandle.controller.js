// controller/patientHandle.controller.js
import { PatientHandleService } from "../services/patientHandle.service.js";
import { Validation } from "../validation/validation.js";
import {
  PatientHandleCreateInput,
  PatientHandleUpdateInput, // kalau nanti butuh update
} from "../validation/patientHandle.validation.js";

export class patientHandleController {
  static async createPatientHandle(req, res, next) {
    try {
      // 1) Validasi body
      const dto = Validation.validate(PatientHandleCreateInput, req.body);

      const nurseId = req.user?.id;
      if (!nurseId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const created = await PatientHandleService.createPatientHandle({
        ...dto,
        nurseIdFromAuth: nurseId,
      });
      const payload = created && created.handle ? created : { handle: created, history: undefined };

      res.status(201).json({
        success: true,
        message: "Patient Handle created successfully",
        result: payload,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPatientHandles(req, res, next) {
    try {
      const result = await PatientHandleService.getAllPatientHandles();
      res.status(200).json({
        success: true,
        message: "Patient Handles fetched successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPatientHandleById(req, res, next) {
    try {
      const { id } = req.params;
      const row = await PatientHandleService.getPatientHandleById(id);

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Patient Handle not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Patient Handle fetched successfully",
        result: row,
      });
    } catch (error) {
      next(error);
    }
  }
}
