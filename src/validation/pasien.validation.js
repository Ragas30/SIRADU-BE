import { z } from "zod";
import prismaPkg from "../../generated/prisma/index.js";
const { Gender } = prismaPkg;

const idSchema = z.string().cuid({ message: "ID harus berupa CUID yang valid" });
const nikSchema = z.string().length(16, { message: "NIK harus 16 digit" });
const nameSchema = z.string().trim().min(3, { message: "Nama minimal 3 karakter" }).max(100, { message: "Nama maksimal 100 karakter" });
const dateBirthSchema = z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }).max(new Date(), { message: "Tanggal lahir tidak boleh di masa depan" });
const genderSchema = z.nativeEnum(Gender, { invalid_type_error: "Gender tidak valid" });
const bedNumberSchema = z.number().int().min(1, { message: "Nomor tempat tidur harus minimal 1" }).max(100, { message: "Nomor tempat tidur harus maksimal 100" });
const bradenQSchema = z.number().min(1).max(23, { message: "Skor Braden Q harus antara 1–23" });
const statusSchema = z.enum(["ACTIVE", "NON_ACTIVE"], { invalid_type_error: "Status tidak valid" });

export class PasienValidation {
  static CREATE = z.object({
    name: nameSchema,
    nik: nikSchema,
    birthDate: dateBirthSchema,
    bedNumber: bedNumberSchema,
    gender: genderSchema,
    bradenQ: bradenQSchema,
    status: statusSchema,
  });

  static UPDATE_BY_ID = z
    .object({
      id: idSchema,
      name: nameSchema.optional(),
      nik: nikSchema.optional(),
      birthDate: dateBirthSchema.optional(),
      bedNumber: bedNumberSchema.optional(),
      gender: genderSchema.optional(),
      bradenQ: bradenQSchema.optional(),
      status: statusSchema.optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: "Minimal satu field harus diubah",
    });

  static GET_BY_ID = z.object({ id: idSchema });

  static DELETE_BY_ID = z.object({ id: idSchema });
}
