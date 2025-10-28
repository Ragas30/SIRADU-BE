// validation/reposisiHistory.validation.js
import z from "zod";

const cuidStr = z.string().cuid({ message: "Harus berupa CUID yang valid" });

const position = z
  .string()
  .min(3, { message: "Posisi minimal 3 karakter" })
  .max(100, { message: "Posisi maksimal 100 karakter" });

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/heic",
];

const FotoSchema = z.object({
  type: z.string().min(1).transform((s) => s.toLowerCase()),
  data: z.string().min(1),
  size: z.coerce
    .number()
    .int()
    .min(1, "Ukuran foto minimal 1 byte")
    .max(2 * 1024 * 1024, "Ukuran foto maksimal 2MB"),
}).superRefine((obj, ctx) => {
  if (!ALLOWED_IMAGE_TYPES.includes(obj.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["type"],
      message: "Foto harus PNG/JPG/JPEG/WEBP/HEIC",
    });
  }
  const prefix = `data:${obj.type};base64,`;
  if (!obj.data.startsWith(prefix)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["data"],
      message: "Data foto harus base64 dengan header sesuai tipe",
    });
  }
});

export const ReposisiHistoryCreateInput = z.object({
  patientId: cuidStr,                         // dari body
  position,                                   // dari body
  bradenQ: z.coerce.number().int().min(1).max(23).optional(), // boleh kosong → pakai dari handle
  dekubitus: z.coerce.boolean().default(false),
  foto: FotoSchema.optional(),                // dari multer → base64
  nurseIdFromAuth: cuidStr,                   // dari token (req.user.id)
});
