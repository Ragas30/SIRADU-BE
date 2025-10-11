import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { PasienController } from "../controller/pasien.controller.js";
import { ReposisiHistoryController } from "../controller/reposisiHistory.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const publicRoutes = express.Router();

// DONE
publicRoutes.post("/dashboard/login", AuthController.headNurseLogin);
publicRoutes.post("/nurse/login", AuthController.nurseLogin);
publicRoutes.post("/nurse/add", AuthController.nurseRegister);

//patient routes
publicRoutes.post("/pasienCreate", authMiddleware, PasienController.createPasien);
publicRoutes.get("/pasiens", authMiddleware, PasienController.getAllPasiens);
publicRoutes.get("/pasien/:id", authMiddleware, PasienController.getPasienById);
publicRoutes.put("/pasien/:id", authMiddleware, PasienController.updatePasien);
publicRoutes.delete("/pasien/:id", authMiddleware, PasienController.deletePasien);
publicRoutes.post("/patient-handle", authMiddleware, PatientHandleController.createPatientHandle);
publicRoutes.get("/patient-handles", authMiddleware, PatientHandleController.getAllPatientHandles);
publicRoutes.get("/patient-handle/:id", authMiddleware, PatientHandleController.getPatientHandleById);

// reposisi history routes
publicRoutes.post("/reposisiCreate", authMiddleware, ReposisiHistoryController.createReposisi);
publicRoutes.get("/reposisis", authMiddleware, ReposisiHistoryController.getAllReposisis);

// reposisi routes
