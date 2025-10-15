import { PatientHistoryService } from "../services/patientHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

export class PatientHistoryController {
  static async getAllPatientHistories(req, res, next) {
    try {
      const data = await PatientHistoryService.getAllPatientHistories();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // GET /patient-histories/by-patient/:patientId
  static async getPatientHistoryById(req, res, next) {
    try {
      const patientId = req.params.patientId || req.params.id;
      if (!patientId) throw new ResponseError(400, "Parameter patientId/id wajib diisi");
      const data = await PatientHistoryService.getPatientHistoryByIdPatient(patientId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // GET /patient-histories/by-name/:name  atau /patient-histories/search?name=...
  static async getPatientHistoryByName(req, res, next) {
    try {
      const name = req.params.name || req.query.name;
      if (!name) throw new ResponseError(400, "Parameter name wajib diisi");
      const data = await PatientHistoryService.getPatientHistoryByPatientName(name);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
