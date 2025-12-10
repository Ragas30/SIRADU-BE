import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { PasienValidation } from "../validation/pasien.validation.js";
import { Validation } from "../validation/validation.js";

// Kolom yang diizinkan untuk sorting
const ALLOWED_SORT = new Set([
  "name",
  "medicalRecordNumber",
  "roomName",
  "email",
  "phone",
  "createdAt",
  "updatedAt",
  "exitDate",
]);
const ALLOWED_STATUSES = new Set(["ACTIVE", "NON_ACTIVE"]);
const MAX_PAGE_SIZE = 200;
const MAX_OFFSET_RECORDS = 50000; // lindungi DB dari OFFSET sangat besar

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

// ====== HELPER: Map bedNumber → roomName ======
function deriveRoomName(bedNumber) {
  if (typeof bedNumber !== "number" || !Number.isFinite(bedNumber)) return null;
  if (bedNumber >= 513 && bedNumber <= 527) return "seruni";
  if (bedNumber >= 528 && bedNumber <= 537) return "lavender10";
  return null; // secara teori tak terjadi karena sudah divalidasi 513–537
}

// ====== HELPER: Normalisasi exitDate (string | Date | null | undefined) → Date | null | undefined ======
function normalizeExitDate(input) {
  if (input === undefined) return undefined; // tidak diubah
  if (input === null || input === "") return null; // kosongkan
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) {
    throw new ResponseError(422, "Format exitDate tidak valid");
  }
  return d;
}

function buildPagination({ page, pageSize, cursor }) {
  const safePage =
    Number.isFinite(+page) && +page > 0 ? Number.parseInt(page, 10) : 1;
  const rawSize =
    Number.isFinite(+pageSize) && +pageSize > 0
      ? Number.parseInt(pageSize, 10)
      : 10;
  const take = Math.min(rawSize, MAX_PAGE_SIZE);

  if (cursor) {
    return {
      cursor: { id: String(cursor) },
      skip: 1,
      take,
      page: safePage,
      pageSize: take,
      mode: "cursor",
      offsetTooLarge: false,
      pageCapped: false,
    };
  }

  const rawSkip = (safePage - 1) * take;
  const skip = Math.min(rawSkip, MAX_OFFSET_RECORDS);
  const offsetTooLarge = rawSkip > MAX_OFFSET_RECORDS;
  const pageCapped = offsetTooLarge;
  const effectivePage = Math.floor(skip / take) + 1;

  return {
    skip,
    take,
    page: effectivePage,
    pageSize: take,
    mode: "offset",
    offsetTooLarge,
    pageCapped,
  };
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

    const roomName = deriveRoomName(pasienRequest.bedNumber);

    const newPasien = await prismaClient.patient.create({
      data: {
        ...pasienRequest,
        roomName, 
      },
    });

    return newPasien;
  }

  static async getAllPasiens(params = {}) {
    console.log(
      "[DEBUG] PasienService.getAllPasiens() dipanggil dengan params:",
      params
    );

    const { skip, take, page, pageSize, cursor, mode, offsetTooLarge, pageCapped } =
      buildPagination(params);
    const search = typeof params.search === "string" ? params.search.trim() : "";

    const rawStatus =
      typeof params.q === "string"
        ? params.q
        : typeof params.status === "string"
        ? params.status
        : null;

    const statusFilter = rawStatus ? rawStatus.trim().toUpperCase() : null;
    const status =
      statusFilter && ALLOWED_STATUSES.has(statusFilter) ? statusFilter : null;

    const { by: sortBy, order: sortOrder } = normalizeSort(
      params.sortBy,
      params.sortOrder
    );

    const whereBase = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          {
            medicalRecordNumber: { contains: search, mode: "insensitive" },
          },
          { roomName: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const whereList = {
      ...whereBase,
      ...(status && { status }),
    };

    console.log("[DEBUG] Prisma whereList:", whereList);

    const doCount = mode === "offset"; // hindari count berat saat pakai cursor

    const [data, groupedCounts] = await Promise.all([
      prismaClient.patient.findMany({
        where: whereList,
        orderBy: [{ [sortBy]: sortOrder }, { id: "asc" }], // tambahkan id agar stabil untuk cursor
        skip,
        take,
        ...(cursor ? { cursor } : {}),
        select: {
          id: true,
          name: true,
          roomName: true,
          medicalRecordNumber: true,
          birthDate: true,
          bedNumber: true,
          gender: true,
          bradenQ: true,
          status: true,
          exitDate: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      doCount
        ? prismaClient.patient.groupBy({
            by: ["status"],
            where: whereBase,
            _count: { status: true },
          })
        : Promise.resolve(null),
    ]);

    const counts =
      groupedCounts?.reduce(
        (acc, row) => {
          const value = row._count.status;
          if (row.status === "ACTIVE") acc.active = value;
          if (row.status === "NON_ACTIVE") acc.nonActive = value;
          acc.total += value;
          return acc;
        },
        { total: 0, active: 0, nonActive: 0 }
      ) ?? null;

    const total =
      counts && status
        ? status === "ACTIVE"
          ? counts.active
          : counts.nonActive
        : counts?.total ?? null;
    const totalActive = counts?.active ?? null;
    const totalNonActive = counts?.nonActive ?? null;

    const nextCursor = data.length === take ? data[data.length - 1].id : null;

    console.log("[DEBUG] Jumlah data ditemukan:", data.length);
    console.log(
      "[DEBUG] total:",
      total,
      "totalActive:",
      totalActive,
      "totalNonActive:",
      totalNonActive
    );

    return { data, total, totalActive, totalNonActive, nextCursor, page, pageSize, pageCapped };
  }

  static async getPasienById(id) {
    console.log("[DEBUG] PasienService.getPasienById:", id);
    const pasien = await prismaClient.patient.findFirst({ where: { id } });

    if (!pasien) throw new ResponseError(404, "Pasien tidak ditemukan");
    return pasien;
  }

  static async updatePasien(id, request) {
    console.log("[DEBUG] PasienService.updatePasien:", id);
    const pasienRequest = Validation.validate(
      PasienValidation.UPDATE_BY_ID,
      request
    );

    const existing = await prismaClient.patient.findUnique({ where: { id } });
    if (!existing) throw new ResponseError(404, "Pasien tidak ditemukan");

    const effectiveBedNumber =
      typeof pasienRequest.bedNumber === "number"
        ? pasienRequest.bedNumber
        : existing.bedNumber;

    const roomName = deriveRoomName(effectiveBedNumber);

    // Abaikan roomName dari request agar selalu mengikuti aturan mapping
    const { roomName: _ignored, exitDate: exitDateRaw, ...rest } =
      pasienRequest;

    const exitDate = normalizeExitDate(exitDateRaw);

    const dataToUpdate = {
      ...rest,
      bedNumber: effectiveBedNumber,
      roomName,
      ...(exitDate !== undefined ? { exitDate } : {}), // hanya set jika user kirim field-nya
    };

    const updated = await prismaClient.patient.update({
      where: { id },
      data: dataToUpdate,
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
