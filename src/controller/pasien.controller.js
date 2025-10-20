import { PasienService } from "../services/pasien.service.js";
import { prismaClient } from "../app/database.js";

function toInt(v, fallback) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export class PasienController {
  static async createPasien(req, res, next) {
    try {
      console.log("[DEBUG] Controller.createPasien dipanggil");
      const result = await PasienService.createPasien(req.body);
      res.status(201).json({
        success: true,
        message: "Pasien created successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPasiens(req, res, next) {
    try {
      console.log("[DEBUG] Controller.getAllPasiens dipanggil");

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

      const allowedStatuses = ["ACTIVE", "NON_ACTIVE"];
      const rawStatus =
        typeof req.query.status === "string"
          ? req.query.status.trim().toUpperCase()
          : typeof req.query.q === "string"
          ? req.query.q.trim().toUpperCase()
          : null;

      const status = allowedStatuses.includes(rawStatus) ? rawStatus : null;

      const allowedSortBy = ["name", "createdAt", "updatedAt", "status", "id"];
      const sortByRaw = typeof req.query.sortBy === "string" ? req.query.sortBy : "name";
      const sortBy = allowedSortBy.includes(sortByRaw) ? sortByRaw : "name";

      const sortOrder =
        typeof req.query.sortOrder === "string" &&
        ["asc", "desc"].includes(req.query.sortOrder.toLowerCase())
          ? req.query.sortOrder.toLowerCase()
          : "asc";

      const params = { page, pageSize, search, sortBy, sortOrder };
      if (status) params.status = status;

      const result = await PasienService.getAllPasiens(params);

      console.log("[DEBUG] Hasil dari PasienService:", result);

      const data = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];

      const total = Number.isFinite(result?.total) ? result.total : data.length;

      let totalActive =
        Number.isFinite(result?.totalActive) && result.totalActive >= 0
          ? result.totalActive
          : null;
      let totalNonActive =
        Number.isFinite(result?.totalNonActive) && result.totalNonActive >= 0
          ? result.totalNonActive
          : null;

      // fallback jika service belum menghitung
      if (totalActive === null || totalNonActive === null) {
        const whereBase = {
          ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { nik: { contains: search, mode: "insensitive" } },
            ],
          }),
        };

        const [cActive, cNonActive] = await Promise.all([
          prismaClient.patient.count({ where: { ...whereBase, status: "ACTIVE" } }),
          prismaClient.patient.count({ where: { ...whereBase, status: "NON_ACTIVE" } }),
        ]);
        totalActive = cActive;
        totalNonActive = cNonActive;
        console.log("[DEBUG] Fallback count:", { totalActive, totalNonActive });
      }

      res.status(200).json({
        data,
        total,
        page,
        pageSize,
        totalActive,
        totalNonActive,
        success: true,
        message: "Pasiens fetched successfully",
      });
    } catch (error) {
      console.error("[ERROR] getAllPasiens:", error);
      next(error);
    }
  }

  static async getPasienById(req, res, next) {
    try {
      console.log("[DEBUG] Controller.getPasienById:", req.params.id);
      const result = await PasienService.getPasienById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Pasien fetched successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePasien(req, res, next) {
    try {
      console.log("[DEBUG] Controller.updatePasien:", req.params.id);
      const result = await PasienService.updatePasien(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Pasien updated successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePasien(req, res, next) {
    try {
      console.log("[DEBUG] Controller.deletePasien:", req.params.id);
      await PasienService.deletePasien(req.params.id);
      res.status(200).json({
        success: true,
        message: "Pasien deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
