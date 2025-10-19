import bcrypt from "bcrypt";
import { prismaClient } from "../app/database.js";

const ALLOWED_SORT = new Set(["name", "email", "role", "createdAt"]);
function normSort(sortBy, sortOrder) {
  const by = ALLOWED_SORT.has(String(sortBy)) ? String(sortBy) : "name";
  const order = ["asc", "desc"].includes(String(sortOrder).toLowerCase())
    ? String(sortOrder).toLowerCase()
    : "asc";
  return { by, order };
}

export const NurseService = {
  async getAllNurse({ page, pageSize, search, sortBy, sortOrder }) {
    const skip = (page - 1) * pageSize;
    const { by, order } = normSort(sortBy, sortOrder);

    // Hindari 'contains' di enum role; fokus ke name/email saja agar aman
    const where =
      search && String(search).trim()
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined;

    const [data, total] = await Promise.all([
      prismaClient.user.findMany({
        where,
        orderBy: { [by]: order },
        skip,
        take: pageSize,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
      prismaClient.user.count({ where }),
    ]);

    return { data, total };
  },

  async editNurse({ id, name, email, role, password }) {
    // Validasi id
    if (!id) throw new Error("Parameter 'id' wajib diisi");

    // Ambil user existing
    const existing = await prismaClient.user.findUnique({
      where: { id: String(id) },
      select: { id: true, email: true },
    });
    if (!existing) throw new Error("Nurse not found");

    // Normalisasi + cek duplikasi email (jika dikirim)
    let normalizedEmail;
    if (typeof email !== "undefined") {
      normalizedEmail = String(email || "").trim().toLowerCase();
      if (normalizedEmail && normalizedEmail !== existing.email.toLowerCase()) {
        const emailOwner = await prismaClient.user.findFirst({
          where: { email: { equals: normalizedEmail, mode: "insensitive" }, NOT: { id } },
          select: { id: true },
        });
        if (emailOwner) throw new Error("Email already in use");
      }
    }

    // Susun data update (hanya field yang dikirim)
    const data = {};
    if (typeof name !== "undefined") data.name = name;
    if (typeof role !== "undefined") data.role = role;
    if (typeof email !== "undefined") data.email = normalizedEmail ?? null;
    if (typeof password !== "undefined" && password) {
      data.password = await bcrypt.hash(String(password), 10);
    }

    // Jika tidak ada perubahan, kembalikan snapshot user
    if (Object.keys(data).length === 0) {
      return prismaClient.user.findUnique({
        where: { id: String(id) },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
    }

    // Update user
    const updated = await prismaClient.user.update({
      where: { id: String(id) },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return updated;
  },

  async deleteNurse(id) {
    const nurse = await prismaClient.user.findUnique({ where: { id: String(id) } });
    if (!nurse) throw new Error("Nurse not found");

    await prismaClient.user.delete({ where: { id: String(id) } });
    return true;
  },
};
