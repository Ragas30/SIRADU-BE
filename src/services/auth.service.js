import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../lib/error.response.js";

export class AuthService {
  static async login(request) {
    const user = await prismaClient.user.findUnique({
      where: { email: request.email },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(400, "Invalid password");
    }

    return user;
  }
}
