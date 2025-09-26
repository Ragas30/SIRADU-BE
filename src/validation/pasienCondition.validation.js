// import {z} from "zod";

// const persepsiSensoriSchema = 

// const kelembapanSchema = z.object({
//   suhu: z.number().min(-50).max(50, { message: "Suhu harus antara -50 dan 50 derajat Celcius" }),
//   kelembapan: z.number().min(0).max(100, { message: "Kelembapan harus antara 0% dan 100%" }),
// });

// const PasienConditionSchema = z.object({
//   id: z.string().uuid(),
//   status: z.enum(["active", "inactive"]),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
// });

// export class PasienConditionValidation {
//   static CREATE = PasienConditionSchema.extend({
//     pasienId: z.string().uuid(),

//     condition: z.string().min(1, "Condition is required"),
//   });
// }
