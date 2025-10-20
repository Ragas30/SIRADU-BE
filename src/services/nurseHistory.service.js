import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";

/** Ganti ini kalau kolom waktu di reposisiHistory bukan "Time" */
const TIME_FIELD = "Time";
const ALLOWED_SORT = new Set([TIME_FIELD, "createdAt", "updatedAt"]);

function normSort(sortBy, sortOrder) {
  const by = ALLOWED_SORT.has(String(sortBy)) ? String(sortBy) : TIME_FIELD;
  const order = ["asc", "desc"].includes(String(sortOrder || "").toLowerCase()) ? String(sortOrder).toLowerCase() : "desc";
  return { by, order };
}

function buildSearchWhere(search) {
  const s = (search || "").trim();
  if (!s) return undefined;
  return {
    OR: [{ nurse: { name: { contains: s, mode: "insensitive" } } }, { patient: { name: { contains: s, mode: "insensitive" } } }],
  };
}

export class NurseHistoryService {
  /** List global nurse histories (pagination + search + sort) */
  static async getAllNurseHistories(params = {}) {
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
            nurse: { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: pageSize,
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      const data = rows.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString(),
      }));

      return { data, total };
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  /** List nurse histories by nurseId (pagination + search + sort) */
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
    };

    const [rows, total] = await Promise.all([
      prismaClient.reposisiHistory.findMany({
        where,
        include: {
          nurse: { select: { id: true, name: true } },
          patient: { select: { id: true, name: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
      }),
      prismaClient.reposisiHistory.count({ where }),
    ]);

    const data = rows.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
    }));

    return { data, total };
  }

  /** List nurse histories by nurse name contains (pagination + sort) */
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
      };

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse: { select: { id: true, name: true } },
            patient: { select: { id: true, name: true } },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: pageSize,
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      const data = rows.map((item) => ({
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
