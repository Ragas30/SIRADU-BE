import z from "zod";

const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });

const coerceInt1to23 = z
  .coerce
  .number({ invalid_type_error: "Braden Q harus berupa angka" })
  .int("Braden Q harus bilangan bulat")
  .min(1, { message: "Braden Q minimal 1" })
  .max(23, { message: "Braden Q maksimal 23" });

const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/heic",
];

const imageType = z
  .object({
    type: z.string().min(1, "Tipe file tidak boleh kosong"),
    data: z.string().min(1, "Data file tidak boleh kosong"),
  })
  .refine(
    (obj) => {
      return (
        allowedImageTypes.includes(obj.type.toLowerCase()) &&
        obj.data.startsWith(`data:${obj.type};base64,`)
      );
    },
    { message: "Foto harus berupa gambar (PNG, JPG, JPEG, WEBP, HEIC) yang valid" }
  )
  .optional();

const fotoSize = z
  .object({
    size: z
      .number()
      .int()
      .min(1, "Ukuran foto minimal 1 byte")
      .max(2 * 1024 * 1024, "Ukuran foto maksimal 2MB"),
  })
  .optional();

const statusEnum = z.enum(["ACTIVE", "NON_ACTIVE"], {
  invalid_type_error: "Status tidak valid",
});

export const PatientHandleCreateInput = z
  .object({
    patientId: cuidStr.optional(),
    patientName: z
      .string()
      .transform((v) => (typeof v === "string" ? v.trim() : v))
      .optional()
      .refine((v) => (v === undefined || v.length > 0), {
        message: "Nama pasien tidak boleh kosong",
      }),
    bradenQ: coerceInt1to23,
    foto: fotoSize.and(imageType).optional(),
    status: statusEnum.default("ACTIVE").optional(),
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
