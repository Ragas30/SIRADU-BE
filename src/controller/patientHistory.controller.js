import { PatientHistoryService } from "../services/patientHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export class PatientHistoryController {
  static async getAllPatientHistories(req, res, next) {
    try {
      const { data, total } = await PatientHistoryService.getAllPatientHistories();
      res.status(200).json({
        data,
        total,
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        success: true,
        message: "Patient histories fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /patient-histories/by-patient/:patientId
  static async getPatientHistoryById(req, res, next) {
    try {
      const patientId = req.params.patientId || req.params.id;
      if (!patientId) throw new ResponseError(400, "Parameter patientId/id wajib diisi");

      // Service versi tanpa parameter aman menerima argumen ekstra (diabaikan)
      const { data, total } = await PatientHistoryService.getPatientHistoryByIdPatient(patientId);

      res.status(200).json({
        data,
        total,
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        success: true,
        message: "Patient history by patient fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /patient-histories/by-name/:name  atau /patient-histories/search?name=...
  static async getPatientHistoryByName(req, res, next) {
    try {
      const name = req.params.name || req.query.name;
      if (!name) throw new ResponseError(400, "Parameter name wajib diisi");

      // Service versi tanpa parameter aman menerima argumen ekstra (diabaikan)
      const { data, total } = await PatientHistoryService.getPatientHistoryByPatientName(name);

      res.status(200).json({
        data,
        total,
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        success: true,
        message: "Patient history by name fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
