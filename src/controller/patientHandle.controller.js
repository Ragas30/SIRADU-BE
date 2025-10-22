import { prismaClient } from "../app/database.js";
import { PatientHandleService } from "../services/patientHandle.service.js";

function toInt(v, fb) { const n = Number.parseInt(String(v ?? ""), 10); return Number.isFinite(n) && n > 0 ? n : fb; }
const SORT_FIELDS = new Set(["createdAt", "updatedAt", "bradenQ", "status"]);

export class PatientHandleController {
  static async getAllPatientHandles(req, res, next) {
    try {
      const page = toInt(req.query.page, 1);
      const pageSize = toInt(req.query.pageSize, 10);
      const search = String(req.query.search ?? "").trim();
      const sortBy = SORT_FIELDS.has(String(req.query.sortBy)) ? String(req.query.sortBy) : "createdAt";
      const sortOrder = String(req.query.sortOrder).toLowerCase() === "asc" ? "asc" : "desc";
      const skip = (page - 1) * pageSize, take = pageSize;

      const where = req.isHeadNurse ? {} : { nurseId: String(req.user.id) };
      if (search) {
        where.OR = [
          { patient: { name: { contains: search, mode: "insensitive" } } },
          { nurse: { name: { contains: search, mode: "insensitive" } } },
        ];
      }

      const [items, total] = await prismaClient.$transaction([
        prismaClient.patientHandle.findMany({
          where,
          include: { nurse: { select: { name: true } }, patient: { select: { name: true } } },
          orderBy: { [sortBy]: sortOrder },
          skip, take,
        }),
        prismaClient.patientHandle.count({ where }),
      ]);

      res.status(200).json({ success: true, message: "Patient Handles fetched", data: items, total, page, pageSize });
    } catch (err) { next(err); }
  }

  static async getPatientHandleById(req, res, next) {
    try {
      const id = String(req.params.id || "");
      const row = await PatientHandleService.getByIdForUserContext(id, { nurseId: req.user.id, isHeadNurse: req.isHeadNurse });
      res.status(200).json({ success: true, message: "Patient Handle fetched", data: [row], total: 1 });
    } catch (error) {
      if (error?.status === 404) return res.status(404).json({ success: false, message: "Patient Handle not found", data: [], total: 0 });
      if (error?.status === 403) return res.status(403).json({ success: false, message: "Forbidden", data: [], total: 0 });
      next(error);
    }
  }

  // 🔸 menerima file dari multer (field name: "foto")
  static async createPatientHandle(req, res, next) {
    try {
      let foto;
      if (req.file) {
        foto = {
          type: req.file.mimetype,
          size: req.file.size,
          data: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        };
      }

      const result = await PatientHandleService.createPatientHandle({
        ...req.body, nurseIdFromAuth: req.user?.id, foto,
      });

      res.status(201).json({
        success: true, message: "Patient Handle created",
        data: result?.handle ? [result.handle] : [], total: result?.handle ? 1 : 0,
      });
    } catch (error) {
      const status = Number(error?.status) || 500;
      return res.status(status).json({ success: false, message: error.message || "Error", data: [], total: 0 });
    }
  }

  static async getPatientHandleByNurseId(req, res, next) {
    try {
      const result = await PatientHandleService.getOwnLatest(req.user.id);
      res.status(200).json({ success: true, message: "Patient Handle fetched", data: result ? [result] : [], total: result ? 1 : 0 });
    } catch (error) {
      if (error?.status === 404) return res.status(404).json({ success: false, message: "Patient Handle not found", data: [], total: 0 });
      next(error);
    }
  }

  static async getByNurseParam(req, res, next) {
    try {
      const nurseId = String(req.params.nurseId || "");
      if (!req.canAccessNurse?.(nurseId)) return res.status(403).json({ success: false, message: "Forbidden", data: [], total: 0 });
      const result = await PatientHandleService.getOwnLatest(nurseId);
      res.status(200).json({ success: true, message: "Patient Handle fetched", data: result ? [result] : [], total: result ? 1 : 0 });
    } catch (error) {
      if (error?.status === 404) return res.status(404).json({ success: false, message: "Patient Handle not found", data: [], total: 0 });
      next(error);
    }
  }
}
