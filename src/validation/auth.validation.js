import { z } from "zod";

export class AuthValidation {
  static LOGIN = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

  static REGISTER = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });
}
