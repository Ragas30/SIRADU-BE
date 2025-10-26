import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { PasienValidation } from "../validation/pasien.validation.js";
import { Validation } from "../validation/validation.js";

// Kolom yang diizinkan untuk sorting
const ALLOWED_SORT = new Set([
  "name",
  "medicalRecordNumber",
  "roomName", // ← tambahkan agar bisa sort by roomName
  "email",
  "phone",
  "createdAt",
  "updatedAt",
]);
const ALLOWED_STATUSES = new Set(["ACTIVE", "NON_ACTIVE"]);

function normalizeSort(sortBy, sortOrder) {
  const by =
    typeof sortBy === "string" && ALLOWED_SORT.has(sortBy) ? sortBy : "name";
  const order =
    typeof sortOrder === "string" &&
    ["asc", "desc"].includes(sortOrder.toLowerCase())
      ? sortOrder.toLowerCase()
      : "asc";
  return { by, order };
}

export class PasienService {
  static async createPasien(request) {
    const pasienRequest = Validation.validate(PasienValidation.CREATE, request);

    const existing = await prismaClient.patient.findFirst({
      where: {
        OR: [
          { medicalRecordNumber: pasienRequest.medicalRecordNumber },
          { name: pasienRequest.name },
        ],
      },
    });

    if (existing) {
      throw new ResponseError(400, "Pasien dengan MRN atau nama ini sudah ada");
    }

    const newPasien = await prismaClient.patient.create({
      data: pasienRequest, // roomName ikut otomatis dari hasil validasi
    });

    return newPasien;
  }

  static async getAllPasiens(params = {}) {
    console.log(
      "[DEBUG] PasienService.getAllPasiens() dipanggil dengan params:",
      params
    );

    const page = Number.isFinite(+params.page) && +params.page > 0 ? +params.page : 1;
    const pageSize =
      Number.isFinite(+params.pageSize) && +params.pageSize > 0
        ? +params.pageSize
        : 10;
    const search = typeof params.search === "string" ? params.search.trim() : "";

    const rawStatus =
      typeof params.q === "string"
        ? params.q
        : typeof params.status === "string"
        ? params.status
        : null;

    const statusFilter = rawStatus ? rawStatus.trim().toUpperCase() : null;
    const status = statusFilter && ALLOWED_STATUSES.has(statusFilter) ? statusFilter : null;

    const { by: sortBy, order: sortOrder } = normalizeSort(
      params.sortBy,
      params.sortOrder
    );
    const skip = (page - 1) * pageSize;

    // search kini mencakup roomName juga
    const whereBase = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { medicalRecordNumber: { contains: search, mode: "insensitive" } },
          { roomName: { contains: search, mode: "insensitive" } }, // ← ditambah
        ],
      }),
    };

    const whereList = {
      ...whereBase,
      ...(status && { status }),
    };

    console.log("[DEBUG] Prisma whereList:", whereList);

    const [data, total, totalActive, totalNonActive] = await Promise.all([
      prismaClient.patient.findMany({
        where: whereList,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          roomName: true, // ← tampilkan di list
          medicalRecordNumber: true,
          birthDate: true,
          bedNumber: true,
          gender: true,
          bradenQ: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prismaClient.patient.count({ where: whereList }),
      prismaClient.patient.count({ where: { ...whereBase, status: "ACTIVE" } }),
      prismaClient.patient.count({ where: { ...whereBase, status: "NON_ACTIVE" } }),
    ]);

    console.log("[DEBUG] Jumlah data ditemukan:", data.length);
    console.log(
      "[DEBUG] total:",
      total,
      "totalActive:",
      totalActive,
      "totalNonActive:",
      totalNonActive
    );

    return { data, total, totalActive, totalNonActive };
  }

  static async getPasienById(id) {
    console.log("[DEBUG] PasienService.getPasienById:", id);
    const pasien = await prismaClient.patient.findFirst({ where: { id } });

    if (!pasien) throw new ResponseError(404, "Pasien tidak ditemukan");
    return pasien; // mengandung roomName juga (semua kolom)
  }

  static async updatePasien(id, request) {
    console.log("[DEBUG] PasienService.updatePasien:", id);
    const pasienRequest = Validation.validate(
      PasienValidation.UPDATE_BY_ID,
      request
    );

    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    const updated = await prismaClient.patient.update({
      where: { id },
      data: pasienRequest, // roomName optional → ikut jika dikirim
    });

    return updated;
  }

  static async deletePasien(id) {
    console.log("[DEBUG] PasienService.deletePasien:", id);
    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    await prismaClient.patient.delete({ where: { id } });
  }
}
