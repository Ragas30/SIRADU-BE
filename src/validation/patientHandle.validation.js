import z from "zod";

const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });
const coerceInt1to23 = z
  .coerce.number({ invalid_type_error: "Braden Q harus berupa angka" })
  .int("Braden Q harus bilangan bulat")
  .min(1, { message: "Braden Q minimal 1" })
  .max(23, { message: "Braden Q maksimal 23" });

const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().url({ message: "Foto harus berupa URL yang valid" }).optional()
);

const statusEnum = z.enum(["ACTIVE", "NON_ACTIVE"], {
  invalid_type_error: "Status tidak valid",
});

export const PatientHandleCreateInput = z.object({
  patientId: cuidStr.optional(),
  patientName: z.string().min(1, "Nama pasien tidak boleh kosong").optional(),
  bradenQ: coerceInt1to23,
  foto: optionalUrl,
  status: statusEnum.default("ACTIVE").optional(),
});


export const PatientHandleUpdateInput = z.object({
  id: cuidStr,
  bradenQ: coerceInt1to23.optional(),
  foto: optionalUrl,
  status: statusEnum.optional(),
});