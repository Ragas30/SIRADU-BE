import { NurseHistoryService } from "../services/nurseHistory.service.js";
import { ResponseError } from "../lib/error.response.js";

export class NurseHistoryController {
  static async getAllNurseHistories(req, res, next) {
    try {
      const data = await NurseHistoryService.getAllNurseHistories();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // GET /nurse-histories/by-nurse/:nurseId
  static async getNurseHistoryById(req, res, next) {
    try {
      const nurseId = req.params.nurseId || req.params.id;
      if (!nurseId) throw new ResponseError(400, "Parameter nurseId/id wajib diisi");
      const data = await NurseHistoryService.getNurseHistoryByIdNurse(nurseId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // GET /nurse-histories/by-name/:name  atau /nurse-histories/search?name=...
  static async getNurseHistoryByName(req, res, next) {
    try {
      const name = req.params.name || req.query.name;
      if (!name) throw new ResponseError(400, "Parameter name wajib diisi");
      const data = await NurseHistoryService.getNurseHistoryByNurseName(name);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

