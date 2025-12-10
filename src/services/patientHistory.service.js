import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { toJakartaISOString } from "../lib/timezone.js";

const SORT_FIELDS = new Set(["Time", "bradenQ", "createdAt"]);
const MAX_PAGE_SIZE = 200;
const MAX_OFFSET_RECORDS = 50000; // batasi offset agar query tidak berat

function buildPagination({ page, pageSize, cursor }) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const rawSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;
  const take = Math.min(rawSize, MAX_PAGE_SIZE);

  // Dengan cursor, kita pakai keyset pagination (skip=1 untuk lewati baris cursor)
  if (cursor) {
    return {
      cursor: { id: String(cursor) },
      skip: 1,
      take,
      page: safePage,
      pageSize: take,
      mode: "cursor",
      pageCapped: false,
    };
  }

  // Fallback offset pagination dengan pembatas
  const rawSkip = (safePage - 1) * take;
  const skip = Math.min(rawSkip, MAX_OFFSET_RECORDS);
  const pageCapped = rawSkip !== skip;
  const effectivePage = Math.floor(skip / take) + 1;

  return {
    skip,
    take,
    page: effectivePage,
    pageSize: take,
    mode: "offset",
    pageCapped,
  };
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

      const { skip, take, page: p, pageSize: ps, cursor: cur, mode, pageCapped } = buildPagination({ page, pageSize, cursor });
      const by = SORT_FIELDS.has(sortBy) ? sortBy : "Time";
      const order = sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const doCount = mode === "offset"; // hindari count berat saat pakai cursor

      const [rows, total] = await Promise.all([
        prismaClient.reposisiHistory.findMany({
          where,
          include: {
            patient: { select: { id: true, name: true } },
            nurse: { select: { id: true, name: true } },
          },
          orderBy: [{ [by]: order }, { id: "asc" }], // tambahkan id untuk urutan deterministik
          skip,
          take,
          ...(cur ? { cursor: cur } : {}),
        }),
        doCount ? prismaClient.reposisiHistory.count({ where }) : Promise.resolve(null),
      ]);

      const nextCursor = rows.length === take ? rows[rows.length - 1].id : null;

      return {
        data: rows.map(mapHistory),
        total,
        nextCursor,
        page: p,
        pageSize: ps,
        pageCapped,
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

      const { skip, take, page: p, pageSize: ps, cursor: cur, mode, pageCapped } = buildPagination(opts);
      const by = SORT_FIELDS.has(opts.sortBy) ? opts.sortBy : "Time";
      const order = opts.sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const doCount = mode === "offset";

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
        doCount ? prismaClient.reposisiHistory.count({ where: { patientId } }) : Promise.resolve(null),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Patient history not found");
      }

      const nextCursor = rows.length === take ? rows[rows.length - 1].id : null;

      return {
        data: rows.map(mapHistory),
        total,
        nextCursor,
        page: p,
        pageSize: ps,
        pageCapped,
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

      const { skip, take, page: p, pageSize: ps, cursor: cur, mode, pageCapped } = buildPagination(opts);
      const by = SORT_FIELDS.has(opts.sortBy) ? opts.sortBy : "Time";
      const order = opts.sortOrder?.toLowerCase() === "asc" ? "asc" : "desc";

      const doCount = mode === "offset";

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
        doCount ? prismaClient.reposisiHistory.count({ where }) : Promise.resolve(null),
      ]);

      if (!rows.length) {
        throw new ResponseError(404, "Patient history not found");
      }

      const nextCursor = rows.length === take ? rows[rows.length - 1].id : null;

      return {
        data: rows.map(mapHistory),
        total,
        nextCursor,
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
