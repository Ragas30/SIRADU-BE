import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../lib/error.response.js";
import { Validation } from "../validation/validation.js";
import { AuthValidation } from "../validation/auth.validation.js";
import { AuthPerawatValidation } from "../validation/auth.validation.js";
import { generateAccessToken, generateAndStoreRefreshToken } from "../lib/token.js";

const sanitizeUser = (u) => {
  if (!u) return u;
  const { password, ...safe } = u;
  return safe;
};

export class AuthService {
  static async headNurseLogin(request) {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);
    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
      select: { id: true, name: true, email: true, role: true, password: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new ResponseError(404, "User not found");
    const ok = await bcrypt.compare(loginRequest.password, user.password);
    if (!ok) throw new ResponseError(400, "Invalid password");
    if (user.role !== "KEPALA_PERAWAT") throw new ResponseError(403, "Access denied");

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateAndStoreRefreshToken(user);
    return { user: sanitizeUser(user), accessToken, refreshToken };
  }

  static async nurseLogin(request) {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);
    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
      select: { id: true, name: true, email: true, role: true, password: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new ResponseError(404, "User not found");
    const ok = await bcrypt.compare(loginRequest.password, user.password);
    if (!ok) throw new ResponseError(400, "Invalid password");
    if (user.role !== "PERAWAT") throw new ResponseError(403, "Access denied");

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateAndStoreRefreshToken(user);
    return { user: sanitizeUser(user), accessToken, refreshToken };
  }

  static async nurseRegister(request) {
    const registerRequest = Validation.validate(AuthPerawatValidation.REGISTER, request);
    const name = String(registerRequest.name || "").trim();
    const email = String(registerRequest.email || "")
      .trim()
      .toLowerCase();
    const password = String(registerRequest.password || "");

    const existing = await prismaClient.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true },
    });
    if (existing) throw new ResponseError(400, "User dengan email ini sudah terdaftar");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword, role: "PERAWAT" },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
    return user;
  }
}
