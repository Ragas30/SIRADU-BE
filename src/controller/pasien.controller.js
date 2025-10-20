import { PasienService } from "../services/pasien.service.js";

// Helper untuk parsing angka aman
function toInt(v, fallback) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export class PasienController {
  static async createPasien(req, res, next) {
    try {
      const request = req.body;
      const result = await PasienService.createPasien(request);
      res.status(201).json({
        success: true,
        message: "Pasien created successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPasiens(req, res, next) {
    try {
      // helper kecil
      const toInt = (value, def) => {
        const n = parseInt(value, 10);
        return Number.isFinite(n) && n > 0 ? n : def;
      };

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

      // status dari query ?status=ACTIVE|NON_ACTIVE (lebih jelas dari 'q')
      const allowedStatuses = ["ACTIVE", "NON_ACTIVE"];
      const rawStatus = typeof req.query.status === "string" ? req.query.status.trim().toUpperCase() : typeof req.query.q === "string" ? req.query.q.trim().toUpperCase() : null;

      const status = allowedStatuses.includes(rawStatus) ? rawStatus : null;

      // whitelist kolom sort agar tidak salah kolom
      const allowedSortBy = ["name", "createdAt", "updatedAt", "status", "id"];
      const sortByRaw = typeof req.query.sortBy === "string" ? req.query.sortBy : "name";
      const sortBy = allowedSortBy.includes(sortByRaw) ? sortByRaw : "name";

      const sortOrder = typeof req.query.sortOrder === "string" && ["asc", "desc"].includes(req.query.sortOrder.toLowerCase()) ? req.query.sortOrder.toLowerCase() : "asc";

      // bangun payload hanya dengan field yang defined
      const params = { page, pageSize, search, sortBy, sortOrder };
      if (status) params.status = status; // ⬅️ hanya kirim jika valid

      const result = await PasienService.getAllPasiens(params);

      let data;
      if (Array.isArray(result?.data)) data = result.data;
      else if (Array.isArray(result?.rows)) data = result.rows;
      else if (Array.isArray(result)) data = result;
      else if (result && typeof result === "object") data = [result];
      else data = [];

      const total = typeof result?.total === "number" && Number.isFinite(result.total) ? result.total : typeof result?.count === "number" && Number.isFinite(result.count) ? result.count : data.length;

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        success: true,
        message: "Pasiens fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPasienById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PasienService.getPasienById(id);
      res.status(200).json({
        success: true,
        message: "Pasien fetched successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePasien(req, res, next) {
    try {
      const id = req.params.id;
      const request = req.body;
      const result = await PasienService.updatePasien(id, request);
      res.status(200).json({
        success: true,
        message: "Pasien updated successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePasien(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PasienService.deletePasien(id);
      res.status(200).json({
        success: true,
        message: "Pasien deleted successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
