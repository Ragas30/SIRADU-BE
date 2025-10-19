import { NurseService } from "../services/nurse.service.js";

function toInt(v, fallback) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export class NurseController {
  static async getAllNurse(req, res, next) {
    try {
      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const sortBy = typeof req.query.sortBy === "string" ? req.query.sortBy : "name";
      const sortOrder = typeof req.query.sortOrder === "string" && ["asc", "desc"].includes(req.query.sortOrder.toLowerCase()) ? req.query.sortOrder.toLowerCase() : "asc";

      const { data, total } = await NurseService.getAllNurse({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      });

      return res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Nurse fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNurse(req, res, next) {
    try {
      const id = String(req.params.id || "");
      const payload = { id, ...req.body }; // gabungkan id + body sesuai kontrak service
      const result = await NurseService.editNurse(payload);

      return res.status(200).json({
        success: true,
        message: "Nurse updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNurse(req, res, next) {
    try {
      const id = String(req.params.id || "");
      const result = await NurseService.deleteNurse(id);

      return res.status(200).json({
        success: true,
        message: "Nurse deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
