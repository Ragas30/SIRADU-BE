import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { toJakartaISOString } from "../lib/timezone.js";

const SORT_FIELDS = new Set(["Time", "bradenQ", "createdAt"]);
const MAX_PAGE_SIZE = 200;
const MAX_OFFSET_RECORDS = 50000; // batasi offset agar query tidak berat
const mapHistory = (r) => ({ ...r, Time: toJakartaISOString(r.Time) });

function buildPagination({ page, pageSize, cursor }) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const rawSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;
  const safeSize = Math.min(rawSize, MAX_PAGE_SIZE);
  if (cursor) {
    return {
      cursor: { id: String(cursor) },
      skip: 1,
      take: safeSize,
      page: safePage,
      pageSize: safeSize,
      pageCapped: false,
    };
  }

  const rawSkip = (safePage - 1) * safeSize;
  const skip = Math.min(rawSkip, MAX_OFFSET_RECORDS);
  const pageCapped = rawSkip !== skip;
  const effectivePage = Math.floor(skip / safeSize) + 1;

  return {
    skip,
    take: safeSize,
    page: effectivePage,
    pageSize: safeSize,
    pageCapped,
  };
}

export class NurseHistoryService {
  static async getAllNurseHistories({ page = 1, pageSize = 10, search = "", sortBy = "Time", sortOrder = "desc", cursor } = {}) {
    try {
      const where = search
        ? {
            OR: [
              { nurse: { name: { contains: search, mode: "insensitive" } } },
              { patient: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : undefined;

      const { skip, take, page: p, pageSize: ps, cursor: cur, pageCapped } = buildPagination({ page, pageSize, cursor });
      const by = SORT_FIELDS.has(sortBy) ? sortBy : "Time";
      const order = sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse: { select: { name: true } },
            patient: { select: { name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }],
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      return {
        data: rows.map(mapHistory),
        total,
        page: p,
        pageSize: ps,
        pageCapped,
      };
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getNurseHistoryByIdNurse({ nurseId, page = 1, pageSize = 10, search = "", sortBy = "Time", sortOrder = "desc", cursor }) {
    try {
      const nurse = await prismaClient.nurse.findUnique({
        where: { id: nurseId },
        select: { id: true, name: true },
      });
      if (!nurse) throw new ResponseError(404, "Nurse not found");

      const where = {
        nurseId,
        ...(search
          ? {
              OR: [
                { patient: { name: { contains: search, mode: "insensitive" } } },
                { nurse: { name: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {}),
      };

      const { skip, take, page: p, pageSize: ps, cursor: cur, pageCapped } = buildPagination({ page, pageSize, cursor });
      const by = SORT_FIELDS.has(sortBy) ? sortBy : "Time";
      const order = sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse: { select: { id: true, name: true } },
            patient: { select: { name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }],
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Nurse history not found");
      }

      return {
        data: rows.map(mapHistory),
        total,
        page: p,
        pageSize: ps,
        pageCapped,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  // by nurse name (Nurse.name)
  static async getNurseHistoryByNurseName({ name, page = 1, pageSize = 10, sortBy = "Time", sortOrder = "desc", cursor }) {
    try {
      const where = {
        nurse: { name: { contains: name, mode: "insensitive" } },
      };

      const { skip, take, page: p, pageSize: ps, cursor: cur, pageCapped } = buildPagination({ page, pageSize, cursor });
      const by = SORT_FIELDS.has(sortBy) ? sortBy : "Time";
      const order = sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            nurse: { select: { id: true, name: true } },
            patient: { select: { name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }],
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Nurse history not found");
      }

      return {
        data: rows.map(mapHistory),
        total,
        page: p,
        pageSize: ps,
        pageCapped,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}
