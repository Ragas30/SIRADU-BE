import z from "zod";

const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });
const coerceInt1to23 = z.coerce.number({ invalid_type_error: "Braden Q harus berupa angka" }).int("Braden Q harus bilangan bulat").min(1, { message: "Braden Q minimal 1" }).max(23, { message: "Braden Q maksimal 23" });

// const optionalUrl = z.preprocess(
//   (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
//   z.string().url({ message: "Foto harus berupa URL yang valid" }).optional()
// );

const imageType = z
  .object({
    type: z.string().min(1, "Tipe file tidak boleh kosong"),
    data: z.string().min(1, "Data file tidak boleh kosong"),
  })
  .refine((obj) => obj.type === "application/pdf" && obj.data.startsWith("data:application/pdf;base64,"), {
    message: "Foto harus berupa file PDF yang valid",
  })
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
  patientName: z.string().min(1, "Nama pasien tidak boleh kosong").optional(),
  bradenQ: coerceInt1to23,
  foto: fotoSize.and(imageType).optional(),
  status: statusEnum.default("ACTIVE").optional(),
});

export const PatientHandleUpdateInput = z.object({
  id: cuidStr,
  bradenQ: coerceInt1to23.optional(),
  foto: fotoSize.and(imageType).optional(),
  status: statusEnum.optional(),
});
