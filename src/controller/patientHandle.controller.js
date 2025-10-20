// controllers/patientHandle.controller.js
import { PatientHandleService } from "../services/patientHandle.service.js";

function toInt(v, fallback) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export class PatientHandleController {
  // GET /patient-handle
  static async getAllPatientHandles({ nurseIdPrioritize, search, sortBy, sortOrder }) {
  // Set default values for pagination and sorting
  const page = 1; // Default page
  const pageSize = 10; // Default page size

  const skip = (page - 1) * pageSize; // How many items to skip for pagination
  const take = pageSize; // How many items to fetch

  // Build query filters
  const whereClause = {};
  
  // If there's a search term, include a filter for patient name or other fields
  if (search) {
    whereClause.OR = [
      { patient: { name: { contains: search, mode: "insensitive" } } },  // Search by patient name
      { nurse: { name: { contains: search, mode: "insensitive" } } },    // Optionally search by nurse name (if relevant)
    ];
  }

  // If we need to prioritize the logged-in nurse's data
  if (nurseIdPrioritize) {
    whereClause.nurseId = nurseIdPrioritize;
  }

  try {
    // Fetch the patient handles with pagination, filtering, and sorting
    const [items, total] = await prismaClient.$transaction(async (tx) => {
      const items = await tx.patientHandle.findMany({
        where: whereClause,
        include: {
          nurse: { select: { name: true } },
          patient: { select: { name: true } },
        },
        orderBy: {
          [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',  // Dynamic sorting based on parameters
        },
        skip,
        take,
      });

      // Get the total count for pagination
      const total = await tx.patientHandle.count({
        where: whereClause,
      });

      return [items, total];
    });

    return { items, total }; // Return items and total for pagination
  } catch (error) {
    throw new Error("Failed to fetch patient handles");
  }
}


  // GET /patient-handle/:id
  static async getPatientHandleById(req, res, next) {
    try {
      const id = String(req.params.id || "");
      const row = await PatientHandleService.getPatientHandleById(id);

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Patient Handle not found",
          data: [],
          total: 0,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Patient Handle fetched successfully",
        data: [row],
        total: 1,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /patient-handle
  static async createPatientHandle(req, res, next) {
    try {
      const nurseId = req.user?.id;
      const result = await PatientHandleService.createPatientHandle({
        ...req.body,           // Zod validation ada di Service
        nurseIdFromAuth: nurseId,
      });

      return res.status(201).json({
        success: true,
        message: "Patient Handle created successfully",
        data: result?.handle ? [result.handle] : [],
        total: result?.handle ? 1 : 0,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPatientHandleByNurseId(req, res, next) {
    try {
      const nurseId = req.user?.id;
      const result = await PatientHandleService.getPatientHandleByNurseId(nurseId);

      return res.status(200).json({
        success: true,
        message: "Patient Handle fetched successfully",
        data: result ? [result] : [],
        total: result ? 1 : 0,
      });
    } catch (error) {
      next(error);
    }
  }
}
