import { z } from "zod";

export class AuthValidation {
    static LOGIN = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(100),
    });
}
