import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../lib/error.response.js";
import { Validation } from "../validation/validation.js";
import {
  AuthValidation, // LOGIN (tanpa role)
} from "../validation/auth.validation.js";
import {
  AuthPerawatValidation, // REGISTER/UPDATE perawat
  AuthKepalaPerawatValidation, // REGISTER/UPDATE kepala_perawat
} from "../validation/auth.validation.js";

const sanitizeUser = (user) => {
  if (!user) return user;
  const { password, ...safe } = user;
  return safe;
};

export class AuthService {
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

    return sanitizeUser(user);
  }

  static async nurseRegister(request) {
    const registerRequest = Validation.validate(AuthPerawatValidation.REGISTER, request);

    const existing = await prismaClient.user.findUnique({
      where: { email: registerRequest.email },
      select: { id: true },
    });

    if (existing) throw new ResponseError(400, "User already exists");

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    return await prismaClient.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword,
        role: "PERAWAT",
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
  }

  static async registerKepalaPerawat(request) {
    const registerRequest = Validation.validate(AuthKepalaPerawatValidation.REGISTER, request);

    const existing = await prismaClient.user.findUnique({
      where: { email: registerRequest.email },
      select: { id: true },
    });
    if (existing) throw new ResponseError(400, "User already exists");

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword, // <-- simpan ke field Prisma 'password'
        role: "kepala_perawat",
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

    return newUser;
  }
}
