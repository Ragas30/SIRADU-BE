import { z } from "zod";
import { Gender } from "@prisma/client";

const trimStr = z.string().transform((s) => s.trim());

const nikSchema = trimStr.regex(/^\d{16}$/, { message: "NIK harus 16 digit angka" });

const nameSchema = trimStr.min(3, { message: "Nama minimal 3 karakter" }).max(100, { message: "Nama maksimal 100 karakter" });

const tanggalLahirSchema = z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }).max(new Date(), { message: "Tanggal lahir tidak boleh di masa depan" });

const idRuanganSchema = trimStr.cuid({
  message: "idRuangan harus berupa CUID yang valid",
});

const genderSchema = z.nativeEnum(Gender, {
  invalid_type_error: "Gender tidak valid",
});

export class PasienValidation {
  static CREATE = z.object({
    name: nameSchema,
    nik: nikSchema,
    tanggalLahir: tanggalLahirSchema,
    idRuangan: idRuanganSchema,
    gender: genderSchema,
  });

  static UPDATE = z
    .object({
      name: nameSchema.optional(),
      nik: nikSchema.optional(),
      tanggalLahir: tanggalLahirSchema.optional(),
      idRuangan: idRuanganSchema.optional(),
      gender: genderSchema.optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), { message: "Minimal satu field harus diubah" });
}

