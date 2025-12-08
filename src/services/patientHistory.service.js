import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { toJakartaISOString } from "../lib/timezone.js";

const SORT_FIELDS = new Set(["Time", "bradenQ", "createdAt"]);
const MAX_PAGE_SIZE = 200;

function buildPagination({ page, pageSize, cursor }) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const rawSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;
  const safeSize = Math.min(rawSize, MAX_PAGE_SIZE);
  if (cursor) {
    return { cursor: { id: String(cursor) }, skip: 1, take: safeSize, page: safePage, pageSize: safeSize };
  }
  return { skip: (safePage - 1) * safeSize, take: safeSize, page: safePage, pageSize: safeSize };
}

function mapHistory(r) {
  return { ...r, Time: toJakartaISOString(r.Time) };
}

export class PatientHistoryService {
  static async getAllPatientHistories({ page = 1, pageSize = 10, search = "", sortBy = "Time", sortOrder = "desc", cursor } = {}) {
    try {
      const where = search
        ? {
            OR: [
              { patient: { name: { contains: search, mode: "insensitive" } } },
              { nurse: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : undefined;

      const { skip, take, page: p, pageSize: ps, cursor: cur } = buildPagination({ page, pageSize, cursor });
      const by = SORT_FIELDS.has(sortBy) ? sortBy : "Time";
      const order = sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
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
      };
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getPatientHistoryByIdPatient(patientId, opts = {}) {
    try {
      const patient = await prismaClient.patient.findUnique({
        where: { id: patientId },
        select: { id: true, name: true },
      });
      if (!patient) throw new ResponseError(404, "Patient not found");

      const { skip, take, page: p, pageSize: ps, cursor: cur } = buildPagination(opts);
      const by = SORT_FIELDS.has(opts.sortBy) ? opts.sortBy : "Time";
      const order = opts.sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where: { patientId },
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }],
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        prismaClient.reposisiHistory.count({ where: { patientId } }),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Patient history not found");
      }

      return {
        data: rows.map(mapHistory),
        total,
        page: p,
        pageSize: ps,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }

  static async getPatientHistoryByPatientName(name, opts = {}) {
    try {
      const where = {
        patient: { name: { contains: name, mode: "insensitive" } },
      };

      const { skip, take, page: p, pageSize: ps, cursor: cur } = buildPagination(opts);
      const by = SORT_FIELDS.has(opts.sortBy) ? opts.sortBy : "Time";
      const order = opts.sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }],
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        prismaClient.reposisiHistory.count({ where }),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Patient history not found");
      }

      return {
        data: rows.map(mapHistory),
        total,
        page: p,
        pageSize: ps,
      };
    } catch (e) {
      if (e instanceof ResponseError) throw e;
      throw new ResponseError(500, "Internal Server Error", e);
    }
  }
}
