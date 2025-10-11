const id = z.string().cuid({ message: "ID harus berupa CUID yang valid" });
const patientId = z.string().min(1, { message: "Nama pasien tidak boleh kosong" });
const nurseId = z.string().min(1, { message: "Nama perawat tidak boleh kosong" });
const bradenQ = z.number().min(1, { message: "Braden Q harus diisi" }).max(23, { message: "Braden Q maksimal 23" });
const foto = z.string().url({ message: "Foto harus berupa URL yang valid" }).optional();
const status = z.enum(["ACTIVE", "NON_ACTIVE"], { invalid_type_error: "Status tidak valid" });

export class patientHandleValidation {
   static CREATE = z.object({
      id: id,
      patientId: patientId,
      nurseId: nurseId,
      bradenQ: bradenQ,
      foto: foto,
      status: status,
   });

   static UPDATE = z.object({
      id: id,
      patientId: patientId.optional(),
      nurseId: nurseId.optional(),
      bradenQ: bradenQ.optional(),
      foto: foto.optional(),
      status: status.optional(),
   });
};