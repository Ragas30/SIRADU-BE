import z from "zod";

const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });

const coerceInt1to23 = z
  .coerce
  .number({ invalid_type_error: "Braden Q harus berupa angka" })
  .int("Braden Q harus bilangan bulat")
  .min(1, { message: "Braden Q minimal 1" })
  .max(23, { message: "Braden Q maksimal 23" });

// pertahankan pola imageType & fotoSize seperti struktur awal
const imageType = z
  .object({
    type: z
      .enum([
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/bmp",
        "image/tiff",
      ])
      .refine((type) => type !== "application/pdf", {
        message: "Foto harus berupa file PDF yang valid",
      }),
    data: z.string().min(1, "Data file tidak boleh kosong"),
  })
  .refine(
    (obj) =>
      obj.type !== "application/pdf" &&
      obj.data.startsWith("data:") &&
      (obj.type === "image/png" ||
        obj.type === "image/jpeg" ||
        obj.type === "image/jpg" ||
        obj.type === "image/gif" ||
        obj.type === "image/bmp" ||
        obj.type === "image/tiff"),
    { message: "Foto harus berupa file gambar yang valid" }
  )
  .optional();

const fotoSize = z
  .object({
    size: z.number().int().min(1, "Ukuran foto minimal 1 byte").max(2097152, "Ukuran foto maksimal 2MB"),
  })
  .refine((obj) => obj.size <= 2097152, {
    message: "Ukuran foto maksimal 2MB",
  })
  .optional();

const statusEnum = z.enum(["ACTIVE", "NON_ACTIVE"], {
  invalid_type_error: "Status tidak valid",
});

export const PatientHandleCreateInput = z.object({
  patientId: cuidStr.optional(),
  patientName: z
    .string()
    .transform((v) => (typeof v === "string" ? v.trim() : v))
    .optional()
    .refine((v) => (v === undefined || v.length > 0), { message: "Nama pasien tidak boleh kosong" }),
  bradenQ: coerceInt1to23,
  foto: fotoSize.and(imageType).optional(),
  status: statusEnum.default("ACTIVE").optional(),
  // field ini diasumsikan disuntik dari auth middleware
  nurseIdFromAuth: cuidStr.optional(),
})
.refine((o) => !!o.patientId || !!o.patientName, {
  message: "Harus menyertakan patientId atau patientName",
  path: ["patientId"],
});

export const PatientHandleUpdateInput = z.object({
  id: cuidStr,
  bradenQ: coerceInt1to23.optional(),
  foto: fotoSize.and(imageType).optional(),
  status: statusEnum.optional(),
});
