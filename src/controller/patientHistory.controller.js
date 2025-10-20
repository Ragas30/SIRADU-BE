import { PatientHistoryService } from "../services/patientHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

const toInt = (v, fb) => {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fb;
};

export const PatientHistoryController = {
  // GET /patient-histories
  async getAllPatientHistories(req, res, next) {
    try {
      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder =
        typeof req.query.sortOrder === "string" &&
        ["asc", "desc"].includes(req.query.sortOrder.toLowerCase())
          ? req.query.sortOrder.toLowerCase()
          : "desc";

      const { data, total } = await PatientHistoryService.getAllPatientHistories({
        page, pageSize, search, sortBy, sortOrder,
      });

      res.status(200).json({
        data, total, page, pageSize,
        success: true, message: "Patient histories fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /patient-histories/by-patient/:patientId
  async getPatientHistoryById(req, res, next) {
    try {
      const patientId = req.params.patientId || req.params.id;
      if (!patientId) throw new ResponseError(400, "Parameter patientId/id wajib diisi");

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder =
        typeof req.query.sortOrder === "string" &&
        ["asc", "desc"].includes(req.query.sortOrder.toLowerCase())
          ? req.query.sortOrder.toLowerCase()
          : "desc";

      const { data, total } = await PatientHistoryService.getPatientHistoryByIdPatient({
        patientId, page, pageSize, search, sortBy, sortOrder,
      });

      res.status(200).json({
        data, total, page, pageSize,
        success: true, message: "Patient history fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /patient-histories/by-name/:name
  async getPatientHistoryByName(req, res, next) {
    try {
      const name = req.params.name || req.query.name;
      if (!name) throw new ResponseError(400, "Parameter name wajib diisi");

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder =
        typeof req.query.sortOrder === "string" &&
        ["asc", "desc"].includes(req.query.sortOrder.toLowerCase())
          ? req.query.sortOrder.toLowerCase()
          : "desc";

      const { data, total } = await PatientHistoryService.getPatientHistoryByPatientName({
        name, page, pageSize, sortBy, sortOrder,
      });

      res.status(200).json({
        data, total, page, pageSize,
        success: true, message: "Patient history fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
