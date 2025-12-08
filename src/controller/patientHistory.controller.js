import { PatientHistoryService } from "../services/patientHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

const toInt = (v, fb) => {
  const n = Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : fb;
};
const normSort = (v, fb = "Time") => (["Time", "bradenQ", "createdAt"].includes(String(v)) ? String(v) : fb);
const normOrder = (v) => (String(v).toLowerCase() === "asc" ? "asc" : "desc");

export class PatientHistoryController {
  static async getAllPatientHistories(req, res, next) {
    try {
      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = normSort(req.query.sortBy);
      const sortOrder = normOrder(req.query.sortOrder);
      const cursor = req.query.cursor;

      const { data, total } = await PatientHistoryService.getAllPatientHistories({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        cursor,
      });
      res.status(200).json({
        data,
        total,
        page,
        pageSize,
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

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const sortBy = normSort(req.query.sortBy);
      const sortOrder = normOrder(req.query.sortOrder);
      const cursor = req.query.cursor;

      const { data, total } = await PatientHistoryService.getPatientHistoryByIdPatient(patientId, {
        page,
        pageSize,
        sortBy,
        sortOrder,
        cursor,
      });

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
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

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const sortBy = normSort(req.query.sortBy);
      const sortOrder = normOrder(req.query.sortOrder);
      const cursor = req.query.cursor;

      const { data, total } = await PatientHistoryService.getPatientHistoryByPatientName(name, {
        page,
        pageSize,
        sortBy,
        sortOrder,
        cursor,
      });

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Patient history by name fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
