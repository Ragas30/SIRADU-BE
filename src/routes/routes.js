import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { PasienController } from "../controller/pasien.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const publicRoutes = express.Router();

// DONE
publicRoutes.post("/dashboard/login", AuthController.headNurseLogin);
publicRoutes.post("/nurse/login", AuthController.nurseLogin);
publicRoutes.post("/nurse/add", AuthController.nurseRegister);

publicRoutes.post("/pasienCreate", authMiddleware, PasienController.createPasien);
publicRoutes.get("/pasiens", authMiddleware, PasienController.getAllPasiens);
publicRoutes.get("/pasien/:id", authMiddleware, PasienController.getPasienById);
publicRoutes.put("/pasien/:id", authMiddleware, PasienController.updatePasien);
publicRoutes.delete("/pasien/:id", authMiddleware, PasienController.deletePasien);
