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
      console.log("[DEBUG] Controller.getAllPasiens dipanggil dengan query:", req.query);

      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);

      const result = await PasienService.getAllPasiens({ ...req.query, page, pageSize });

      res.status(200).json({
        data: result.data,
        total: result.total,
        page, // ← jangan ambil dari result.page (tidak ada)
        pageSize, // ← sama
        totalActive: result.totalActive,
        totalNonActive: result.totalNonActive,
        success: true,
        message: "Pasiens fetched successfully",
      });
    } catch (error) {
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
