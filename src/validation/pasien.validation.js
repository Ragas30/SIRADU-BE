import { Prisma } from "@prisma/client";
import { z } from "zod";
const { Gender } = Prisma;

const GENDER_VALUES = ["LAKI_LAKI", "PEREMPUAN"];

const idSchema = z.string().cuid({ message: "ID harus berupa CUID yang valid" });
const medicalRecordNumberSchema = z.string().min(8, { message: "Nomor rekam medis harus minimal 8 karakter" }).length(8, { message: "Nomor rekam medis harus 8 digit" });
const nameSchema = z.string().trim().min(3, { message: "Nama minimal 3 karakter" }).max(100, { message: "Nama maksimal 100 karakter" });
const dateBirthSchema = z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }).max(new Date(), { message: "Tanggal lahir tidak boleh di masa depan" });
const genderSchema = z.enum(GENDER_VALUES, { invalid_type_error: "Gender tidak valid" });
const bedNumberSchema = z.number().int().min(513, { message: "Nomor tempat tidur harus minimal 513" }).max(537, { message: "Nomor tempat tidur harus maksimal 537" });
const bradenQSchema = z.number().min(1).max(23, { message: "Skor Braden Q harus antara 1–23" });
const statusSchema = z.enum(["ACTIVE", "NON_ACTIVE"], { invalid_type_error: "Status tidak valid" });
const roomNameSchema = z.string().trim().min(3, { message: "Nama ruangan minimal 3 karakter" }).max(100, { message: "Nama ruangan maksimal 100 karakter" });

export class PasienValidation {
  static CREATE = z.object({
    name: nameSchema,
    medicalRecordNumber: medicalRecordNumberSchema,
    birthDate: dateBirthSchema,
    bedNumber: bedNumberSchema,
    gender: genderSchema,
    bradenQ: bradenQSchema,
    status: statusSchema,
    // roomName: roomNameSchema,
  });

  static UPDATE_BY_ID = z
    .object({
      name: nameSchema.optional(),
      medicalRecordNumber: medicalRecordNumberSchema.optional(),
      birthDate: dateBirthSchema.optional(),
      bedNumber: bedNumberSchema.optional(),
      gender: genderSchema.optional(),
      bradenQ: bradenQSchema.optional(),
      status: statusSchema.optional(),
      roomName: roomNameSchema.optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: "Minimal satu field harus diubah",
    });

  static GET_BY_ID = z.object({ id: idSchema });

  static DELETE_BY_ID = z.object({ id: idSchema });
}
