import z from "zod";
import prismaPkg from "../../generated/prisma/index.js";

const id = z.string().cuid({ message: "ID harus berupa CUID yang valid" });
const patientId = z.string().cuid({ message: "ID pasien harus berupa CUID yang valid" });
const position = z.string().min(3, { message: "Posisi minimal 3 karakter" }).max(100, { message: "Posisi maksimal 100 karakter" });
const nurseId = z.string().cuid({ message: "ID perawat harus berupa CUID yang valid" });
const bradenQ = z.number().min(1).max(23, { message: "Skor Braden Q harus antara 1–23" });
const photo = z.string().url({ message: "Foto harus berupa URL yang valid" }).optional();

export class ReposisiValidation {
    static CREATE = z.object({
        id: patientId,
        position: position,
        nurseId: nurseId,
        bradenQ: bradenQ,
        photo: photo,
    });

}