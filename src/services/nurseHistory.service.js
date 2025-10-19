import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

/** Ubah ini kalau kolom waktu di reposisiHistory bukan "Time" */
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
      { nurse:   { name: { contains: s, mode: "insensitive" } } },
      { patient: { name: { contains: s, mode: "insensitive" } } },
    ],
  };
}

/** Parse YYYY-MM-DD / ISO string → Date | undefined */
function parseDate(d) {
  if (!d || typeof d !== "string") return undefined;
  const trimmed = d.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return new Date(`${trimmed}T00:00:00.000Z`);
  const dt = new Date(trimmed);
  return isNaN(+dt) ? undefined : dt;
}

/** Buat exclusive upper bound utk endDate: jika YYYY-MM-DD → +1 hari (inklusif harian) */
function normalizeEndExclusive(endDateStr) {
  const e = parseDate(endDateStr);
  if (!e) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(endDateStr.trim())) {
    const next = new Date(e);
    next.setUTCDate(next.getUTCDate() + 1);
    return next; // < next day 00:00Z
  }
  return e; // pakai apa adanya sebagai exclusive bound
}

/** Build filter range utk kolom tanggal (default createdAt) */
function buildDateRange({ startDate, endDate, field = "createdAt" }) {
  const s = parseDate(startDate);
  const eExclusive = normalizeEndExclusive(endDate);
  if (!s && !eExclusive) return undefined;
  return {
    [field]: {
      ...(s ? { gte: s } : {}),
      ...(eExclusive ? { lt: eExclusive } : {}),
    },
  };
}

export class NurseHistoryService {
  /**
   * List semua nurse histories (global) dengan pagination/search/sort + date-range (createdAt)
   */
  static async getAllNurseHistories(params = {}) {
    try {
      const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
      const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
      const search = typeof params.search === "string" ? params.search : "";
      const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

      const skip = (page - 1) * pageSize;

      const where = {
        ...(buildSearchWhere(search) || {}),
        ...(buildDateRange({ startDate: params.startDate, endDate: params.endDate, field: "createdAt" }) || {}),
      };

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse:   { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
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

  /**
   * List nurse histories berdasarkan nurseId + pagination/search/sort + date-range (createdAt)
   */
  static async getNurseHistoryByIdNurse(params) {
    const nurseId = String(params?.nurseId || "");
    if (!nurseId) throw new ResponseError(400, "Parameter nurseId wajib diisi");

    // pastikan nurse ada
    const nurse = await prismaClient.user.findUnique({
      where: { id: nurseId },
      select: { id: true, name: true },
    });
    if (!nurse) throw new ResponseError(404, "Nurse not found");

    const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
    const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
    const search = typeof params.search === "string" ? params.search : "";
    const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

    const skip = (page - 1) * pageSize;

    const where = {
      nurseId,
      ...(buildSearchWhere(search) || {}),
      ...(buildDateRange({ startDate: params.startDate, endDate: params.endDate, field: "createdAt" }) || {}),
    };

    const [rows, total] = await Promise.all([
      prismaClient.reposisiHistory.findMany({
        where,
        include: {
          nurse:   { select: { id: true, name: true } },
          patient: { select: { id: true, name: true } },
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

  /**
   * List nurse histories berdasarkan nama perawat (contains) + pagination/sort + date-range (createdAt)
   */
  static async getNurseHistoryByNurseName(params) {
    const name = String(params?.name || "").trim();
    if (!name) throw new ResponseError(400, "Parameter name wajib diisi");

    try {
      const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
      const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
      const { by: sortBy, order: sortOrder } = normSort(params.sortBy, params.sortOrder);

      const skip = (page - 1) * pageSize;

      const where = {
        nurse: { name: { contains: name, mode: "insensitive" } },
        ...(buildDateRange({ startDate: params.startDate, endDate: params.endDate, field: "createdAt" }) || {}),
      };

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse:   { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
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
