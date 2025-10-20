import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

/** Ganti ini kalau kolom waktu di reposisiHistory bukan "Time" */
const TIME_FIELD = "Time";
const ALLOWED_SORT = new Set([TIME_FIELD, "createdAt", "updatedAt"]);

function normSort(sortBy, sortOrder) {
  const by = ALLOWED_SORT.has(String(sortBy)) ? String(sortBy) : TIME_FIELD;
  const order = ["asc", "desc"].includes(String(sortOrder || "").toLowerCase())
    ? String(sortOrder).toLowerCase()
    : "desc";
  return { by, order };
}

function buildSearchWhere(search) {
  const s = (search || "").trim();
  if (!s) return undefined;
  return {
    OR: [
      { patient: { name: { contains: s, mode: "insensitive" } } },
      { nurse:   { name: { contains: s, mode: "insensitive" } } },
      // Tambah field lain bila perlu, mis. { note: { contains: s, mode: "insensitive" } }
    ],
  };
}

export class PatientHistoryService {
  /** List global patient histories (pagination + search + sort) */
  static async getAllPatientHistories(params = {}) {
    try {
      const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
      const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
      const search = typeof params.search === "string" ? params.search : "";
      const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

      const skip = (page - 1) * pageSize;
      const where = buildSearchWhere(search) || {};

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            patient: { select: { id: true, name: true } },
            nurse:   { select: { id: true, name: true } },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: pageSize,
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      const data = rows.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString(),
      }));

      return { data, total };
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  /** List histories by patientId (pagination + search + sort) */
  static async getPatientHistoryByIdPatient(params) {
    const patientId = String(params?.patientId || "");
    if (!patientId) throw new ResponseError(400, "Parameter patientId wajib diisi");

    // Pastikan patient ada
    const patient = await prismaClient.patient.findUnique({
      where: { id: patientId },
      select: { id: true, name: true },
    });
    if (!patient) throw new ResponseError(404, "Patient not found");

    const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
    const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
    const search = typeof params.search === "string" ? params.search : "";
    const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

    const skip = (page - 1) * pageSize;

    const where = {
      patientId,
      ...(buildSearchWhere(search) || {}),
    };

    const [rows, total] = await Promise.all([
      prismaClient.reposisiHistory.findMany({
        where,
        include: {
          patient: { select: { id: true, name: true } },
          nurse:   { select: { id: true, name: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
      }),
      prismaClient.reposisiHistory.count({ where }),
    ]);

    const data = rows.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
    }));

    return { data, total };
  }

  /** List histories by patient name contains (pagination + sort) */
  static async getPatientHistoryByPatientName(params) {
    const name = String(params?.name || "").trim();
    if (!name) throw new ResponseError(400, "Parameter name wajib diisi");

    try {
      const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
      const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
      const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

      const skip = (page - 1) * pageSize;

      const where = {
        patient: { name: { contains: name, mode: "insensitive" } },
      };

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            patient: { select: { id: true, name: true } },
            nurse:   { select: { id: true, name: true } },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: pageSize,
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      const data = rows.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString(),
      }));

      return { data, total };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}
