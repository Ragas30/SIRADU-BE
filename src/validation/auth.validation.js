import { z } from "zod";

const role = z.enum(["kepala_perawat", "perawat"], {
  message: "Role harus berupa salah satu dari: kepala_perawat, perawat",
});

const idSchema = z.string().cuid({ message: "ID harus berupa CUID yang valid" });

const nameSchema = z.string().trim().min(3, { message: "Nama minimal 3 karakter" }).max(100, { message: "Nama maksimal 100 karakter" });

const emailSchema = z.string().trim().toLowerCase().email({ message: "Email tidak valid" });

/** Password kuat untuk REGISTER/UPDATE */
const strongPassword = z.string().min(8, { message: "Password minimal 8 karakter" }).max(100, { message: "Password maksimal 100 karakter" });

/** Password standar untuk LOGIN */
const loginPassword = z.string().min(8, { message: "Password minimal 8 karakter" }).max(100, { message: "Password maksimal 100 karakter" });

const invalidLogin = (msg) => `Invalid login payload: Username or password salah, ${msg}`;

const atLeastOne = (keys) => (data) => keys.some((k) => data[k] !== undefined);

export class AuthValidation {
  static LOGIN = z
    .object({
      email: emailSchema,
      password: loginPassword,
    })
    .strict();
}

/* ===== PERAWAT ===== */
export class AuthPerawatValidation {
  static REGISTER = z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: strongPassword,
      role: z.literal("perawat", { message: "Role harus perawat" }),
    })
    .strict();

  static UPDATE = z
    .object({
      id: idSchema,
      name: nameSchema.optional(),
      email: emailSchema.optional(),
      password: strongPassword.optional(),
    })
    .strict()
    .refine(atLeastOne(["name", "email", "password"]), {
      message: "Minimal satu dari name/email/password harus diisi untuk update",
      path: ["_root"],
    });
}

/* ===== KEPALA PERAWAT ===== */
export class AuthKepalaPerawatValidation {
  static REGISTER = z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: strongPassword,
      role: z.literal("kepala_perawat", {
        message: "Role harus kepala_perawat",
      }),
    })
    .strict();

  static UPDATE = z
    .object({
      id: idSchema,
      name: nameSchema.optional(),
      email: emailSchema.optional(),
      password: strongPassword.optional(),
    })
    .strict()
    .refine(atLeastOne(["name", "email", "password"]), {
      message: "Minimal satu dari name/email/password harus diisi untuk update",
      path: ["_root"],
    });
}
