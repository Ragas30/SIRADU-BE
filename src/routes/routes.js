import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { PasienController } from "../controller/pasien.controller.js";

export const publicRoutes = express.Router();

// DONE
publicRoutes.post("/nurse/login", AuthController.nurseLogin);
publicRoutes.post("/nurse/add", AuthController.nurseRegister);

publicRoutes.get("/pasienCreate", PasienController.createPasien);
publicRoutes.get("/pasiens", PasienController.getAllPasiens);
publicRoutes.get("/pasien/:id", PasienController.getPasienById);
publicRoutes.put("/pasien/:id", PasienController.updatePasien);
publicRoutes.delete("/pasien/:id", PasienController.deletePasien);
