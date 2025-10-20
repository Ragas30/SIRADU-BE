import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { PasienValidation } from "../validation/pasien.validation.js";
import { Validation } from "../validation/validation.js";

// Kolom yang diizinkan untuk sorting
const ALLOWED_SORT = new Set(["name", "nik", "email", "phone", "createdAt", "updatedAt"]);

const ALLOWED_STATUSES = new Set(["ACTIVE", "NON_ACTIVE"]);

function normalizeSort(sortBy, sortOrder) {
  const by = typeof sortBy === "string" && ALLOWED_SORT.has(sortBy) ? sortBy : "name";
  const order = typeof sortOrder === "string" && ["asc", "desc"].includes(sortOrder.toLowerCase()) ? sortOrder.toLowerCase() : "asc";
  return { by, order };
}

export class PasienService {
  static async createPasien(request) {
    const pasienRequest = Validation.validate(PasienValidation.CREATE, request);

    const existing = await prismaClient.patient.findFirst({
      where: {
        OR: [{ nik: pasienRequest.nik }, { name: pasienRequest.name }],
      },
    });

    if (existing) {
      throw new ResponseError(400, "Pasien dengan NIK atau nama ini sudah ada");
    }

    const newPasien = await prismaClient.patient.create({
      data: pasienRequest,
    });

    return newPasien;
  }

  static async getAllPasiens(params = {}) {
    const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
    const pageSize = Number.isFinite(+params.pageSize) && +params.pageSize > 0 ? +params.pageSize : 10;
    const search = typeof params.search === "string" ? params.search.trim() : "";

    // baca dari q atau status
    const rawStatus = typeof params.q === "string" ? params.q : typeof params.status === "string" ? params.status : null;

    const statusFilter = rawStatus ? rawStatus.trim().toUpperCase() : null;
    const status = statusFilter && ALLOWED_STATUSES.has(statusFilter) ? statusFilter : null;

    const { by: sortBy, order: sortOrder } = normalizeSort(params.sortBy, params.sortOrder);
    const skip = (page - 1) * pageSize;

    const where = {
      ...(search && {
        OR: [{ name: { contains: search, mode: "insensitive" } }, { nik: { contains: search, mode: "insensitive" } }],
      }),
      ...(status && { status: status }), // pakai langsung equality sederhana
    };

    const [data, total] = await Promise.all([
      prismaClient.patient.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          nik: true,
          birthDate: true,
          bedNumber: true,
          gender: true,
          bradenQ: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prismaClient.patient.count({ where }),
    ]);

    return { data, total };
  }

  static async getPasienById(id) {
    const pasien = await prismaClient.patient.findFirst({
      where: { id },
    });

    if (!pasien) throw new ResponseError(404, "Pasien tidak ditemukan");
    return pasien;
  }

  static async updatePasien(id, request) {
    const pasienRequest = Validation.validate(PasienValidation.UPDATE_BY_ID, request);

    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    const updated = await prismaClient.patient.update({
      where: { id },
      data: pasienRequest,
    });

    return updated;
  }

  static async deletePasien(id) {
    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    await prismaClient.patient.delete({ where: { id } });
  }
}
