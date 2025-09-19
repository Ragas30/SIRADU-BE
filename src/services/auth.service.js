import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../lib/error.response.js";
import {Validation} from "../validation/validation.js";
import {AuthValidation} from "../validation/auth.validation.js";

export class AuthService {
  static async login(request) {
    const loginRequest = Validation.validate(
        AuthValidation.LOGIN,
        request
    );

    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(400, "Invalid password");
    }

    return user;
  }
}
