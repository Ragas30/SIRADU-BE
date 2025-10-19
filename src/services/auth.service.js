import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../lib/error.response.js";
import { Validation } from "../validation/validation.js";
import { AuthValidation } from "../validation/auth.validation.js";
import { AuthPerawatValidation } from "../validation/auth.validation.js";
import { generateAccessToken } from "../lib/token.js";

const sanitizeUser = (user) => {
  if (!user) return user;
  const { password, ...safe } = user;
  return safe;
};

export class AuthService {
  static async headNurseLogin(request) {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new ResponseError(404, "User not found");

    const ok = await bcrypt.compare(loginRequest.password, user.password);

    if (!ok) throw new ResponseError(400, "Invalid password");

    if (user.role !== "KEPALA_PERAWAT") throw new ResponseError(403, "Access denied");

    const token = generateAccessToken(user);

    return {
      user: sanitizeUser(user),
      token: token,
    };
  }

  static async nurseLogin(request) {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new ResponseError(404, "User not found");

    const ok = await bcrypt.compare(loginRequest.password, user.password);

    if (!ok) throw new ResponseError(400, "Invalid password");

    if (user.role !== "PERAWAT") throw new ResponseError(403, "Access denied");

    const token = generateAccessToken(user);

    return {
      user: sanitizeUser(user),
      token: token,
    };
  }

  static async nurseRegister(request) {
    const registerRequest = Validation.validate(AuthPerawatValidation.REGISTER, request);

    // Normalisasi
    const name = String(registerRequest.name || "").trim();
    const email = String(registerRequest.email || "")
      .trim()
      .toLowerCase();
    const password = String(registerRequest.password || "");

    // Cek email sudah terpakai (case-insensitive)
    const existing = await prismaClient.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true },
    });
    if (existing) throw new ResponseError(400, "User dengan email ini sudah terdaftar");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PERAWAT", // jika pakai enum Prisma pastikan cocok
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
