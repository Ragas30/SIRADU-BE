import { NurseHistoryService } from "../services/nurseHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

const toInt = (v, fb) => {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fb;
};

export const NurseHistoryController = {
  // GET /nurse-histories
  async getAllNurseHistories(req, res, next) {
    try {
      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder = typeof req.query.sortOrder === "string" && ["asc", "desc"].includes(req.query.sortOrder.toLowerCase()) ? req.query.sortOrder.toLowerCase() : "desc";

      const { data, total } = await NurseHistoryService.getAllNurseHistories({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      });

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Nurse histories fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /nurse-histories/by-nurse/:nurseId
  async getNurseHistoryById(req, res, next) {
    try {
      const nurseId = req.params.nurseId || req.params.id;
      if (!nurseId) throw new ResponseError(400, "Parameter nurseId/id wajib diisi");

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder = typeof req.query.sortOrder === "string" && ["asc", "desc"].includes(req.query.sortOrder.toLowerCase()) ? req.query.sortOrder.toLowerCase() : "desc";

      const { data, total } = await NurseHistoryService.getNurseHistoryByIdNurse({
        nurseId,
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      });

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Nurse history fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /nurse-histories/by-name/:name
  async getNurseHistoryByName(req, res, next) {
    try {
      const name = req.params.name || req.query.name;
      if (!name) throw new ResponseError(400, "Parameter name wajib diisi");

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "Time";
      const sortOrder = typeof req.query.sortOrder === "string" && ["asc", "desc"].includes(req.query.sortOrder.toLowerCase()) ? req.query.sortOrder.toLowerCase() : "desc";

      const { data, total } = await NurseHistoryService.getNurseHistoryByNurseName({
        name,
        page,
        pageSize,
        sortBy,
        sortOrder,
      });

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Nurse history fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
