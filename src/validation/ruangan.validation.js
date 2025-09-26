import { z } from "zod";

const idRuanganSchema = z.string().cuid({
  message: "ID Ruangan harus berupa CUID yang valid",
});

const namaRuanganSchema = z.string()
  .min(3, { message: "Nama Ruangan minimal 3 karakter" })
  .max(50, { message: "Nama Ruangan maksimal 50 karakter" });

  const idPerawatanSchema = z.string().cuid({
  message: "ID Perawatan harus berupa CUID yang valid",
});

export class RuanganValidation {
  static CREATE = z.object({
    namaRuangan: namaRuanganSchema,
    kapasitas: z
      .number({
        required_error: "Kapasitas harus diisi",
        invalid_type_error: "Kapasitas harus berupa angka",
      })
      .int({ message: "Kapasitas harus berupa angka bulat" })
      .min(1, { message: "Kapasitas harus minimal 1" })
      .max(1000, { message: "Kapasitas tidak boleh melebihi 1000" }),
    lokasi: z
      .string()
      .min(3, { message: "Lokasi harus minimal 3 karakter" })
      .max(100, { message: "Lokasi tidak boleh melebihi 100 karakter" })
      .optional(),
  });

  static UPDATE = z.object({
    namaRuangan: z
      .string()
      .min(3, { message: "Nama harus minimal 3 karakter" })
      .max(50, { message: "Nama tidak boleh melebihi 50 karakter" })
      .optional(),
    kapasitas: z
      .number({
        invalid_type_error: "Kapasitas harus berupa angka",
      })
      .int({ message: "Kapasitas harus berupa angka bulat" })
      .min(1, { message: "Kapasitas harus minimal 1" })
      .max(1000, { message: "Kapasitas tidak boleh melebihi 1000" })
      .optional(),
    lokasi: z
      .string()
      .min(3, { message: "Lokasi harus minimal 3 karakter" })
      .max(100, { message: "Lokasi tidak boleh melebihi 100 karakter" })
      .optional(),
  });


}

