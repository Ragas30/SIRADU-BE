import z from "zod";

// NOTE: jika DB pakai cuid2, ganti .cuid() -> .cuid2()
const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });

const coerceInt1to23 = z
  .coerce
  .number({ invalid_type_error: "Braden Q harus berupa angka" })
  .int("Braden Q harus bilangan bulat")
  .min(1, { message: "Braden Q minimal 1" })
  .max(23, { message: "Braden Q maksimal 23" });

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/heic"];

const FotoSchema = z.object({
  type: z.string().min(1, "Tipe file tidak boleh kosong").transform((s) => s.toLowerCase()),
  data: z.string().min(1, "Data file tidak boleh kosong"),
  size: z.coerce.number().int().min(1, "Ukuran foto minimal 1 byte").max(2 * 1024 * 1024, "Ukuran foto maksimal 2MB"),
}).superRefine((obj, ctx) => {
  if (!ALLOWED_IMAGE_TYPES.includes(obj.type)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["type"], message: "Foto harus PNG, JPG, JPEG, WEBP, atau HEIC" });
  }
  const prefix = `data:${obj.type};base64,`;
  if (!obj.data.startsWith(prefix)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["data"], message: "Data foto harus base64 dengan header yang sesuai tipe" });
  }
});

export const PatientHandleCreateInput = z
  .object({
    patientId: cuidStr.optional(),
    patientName: z
      .string()
      .transform((v) => (typeof v === "string" ? v.trim() : v))
      .optional()
      .refine((v) => v === undefined || v.length > 0, { message: "Nama pasien tidak boleh kosong" }),

    bradenQ: coerceInt1to23.optional(),
    foto: FotoSchema.optional(),

    nurseIdFromAuth: cuidStr,                 // ← wajib
    dekubitus: z.coerce.boolean().default(false),
  })
  .refine((o) => !!o.patientId || !!o.patientName, {
    message: "Harus menyertakan patientId atau patientName",
    path: ["patientId"],
  });

/** UPDATE (opsional) */
export const PatientHandleUpdateInput = z.object({
  id: cuidStr,
  bradenQ: coerceInt1to23.optional(),
  foto: FotoSchema.optional(),
  // status bisa ditambahkan kalau memang kamu butuh ubah status via update:
  // status: z.preprocess((v) => String(v ?? "").toUpperCase(), z.enum(["ACTIVE", "NON_ACTIVE"])).optional(),
  dekubitus: z.coerce.boolean().optional(),
});
