// validation/patientHandle.validation.js
import z from "zod";

// NOTE: pakai .cuid(); jika di DB kamu pakai cuid2, ganti ke .cuid2()
const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });

const coerceInt1to23 = z.coerce.number({ invalid_type_error: "Braden Q harus berupa angka" }).int("Braden Q harus bilangan bulat").min(1, { message: "Braden Q minimal 1" }).max(23, { message: "Braden Q maksimal 23" });

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/heic"];

const FotoSchema = z
  .object({
    type: z
      .string()
      .min(1, "Tipe file tidak boleh kosong")
      .transform((s) => s.toLowerCase()),
    data: z.string().min(1, "Data file tidak boleh kosong"),
    size: z.coerce
      .number()
      .int()
      .min(1, "Ukuran foto minimal 1 byte")
      .max(2 * 1024 * 1024, "Ukuran foto maksimal 2MB"),
  })
  .superRefine((obj, ctx) => {
    if (!ALLOWED_IMAGE_TYPES.includes(obj.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["type"],
        message: "Foto harus PNG, JPG, JPEG, WEBP, atau HEIC",
      });
    }
    const prefix = `data:${obj.type};base64,`;
    if (!obj.data.startsWith(prefix)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["data"],
        message: "Data foto harus base64 dengan header yang sesuai tipe",
      });
    }
  });

const StatusSchema = z.preprocess((v) => String(v ?? "").toUpperCase(), z.enum(["ACTIVE", "NON_ACTIVE"], { invalid_type_error: "Status tidak valid" }));

export const PatientHandleCreateInput = z
  .object({
    patientId: cuidStr.optional(),
    patientName: z
      .string()
      .transform((v) => (typeof v === "string" ? v.trim() : v))
      .optional()
      .refine((v) => v === undefined || v.length > 0, { message: "Nama pasien tidak boleh kosong" }),

    bradenQ: coerceInt1to23,
    foto: FotoSchema.optional(),
    status: StatusSchema.optional().default("ACTIVE"),

    nurseIdFromAuth: cuidStr.optional(), // biarkan optional → service akan balas 401 jika hilang
    needsManualReposition: z.coerce.boolean().default(false),
    dekubitus: z.coerce.boolean().default(false), // WAJIB di DB → pastikan ada nilai
  })
  .refine((o) => !!o.patientId || !!o.patientName, {
    message: "Harus menyertakan patientId atau patientName",
    path: ["patientId"],
  });

export const PatientHandleUpdateInput = z.object({
  id: cuidStr,
  bradenQ: coerceInt1to23.optional(),
  foto: FotoSchema.optional(),
  status: StatusSchema.optional(),
  needsManualReposition: z.coerce.boolean().optional(),
  dekubitus: z.coerce.boolean().optional(),
});
