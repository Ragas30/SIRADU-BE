import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { PasienController } from "../controller/pasien.controller.js";
import { ReposisiHistoryController } from "../controller/reposisiHistory.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";
import { patientHandleController } from "../controller/patientHandle.controller.js";
import { PatientHistoryController } from "../controller/patientHistory.controller.js";
import { NurseHistoryController } from "../controller/nurseHistory.controller.js";
import { TestController } from "../controller/test.controller.js";

export const publicRoutes = express.Router();

// DONE
publicRoutes.get("/test", TestController.test);

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
publicRoutes.post("/patient-handle", authMiddleware, patientHandleController.createPatientHandle);
publicRoutes.get("/patient-handles", authMiddleware, patientHandleController.getAllPatientHandles);
publicRoutes.get("/patient-handle/:id", authMiddleware, patientHandleController.getPatientHandleById);

// reposisi history routes
publicRoutes.post("/reposisiCreate", authMiddleware, ReposisiHistoryController.createReposisi);
publicRoutes.get("/reposisis", authMiddleware, ReposisiHistoryController.getAllReposisis);

// patient history routes
publicRoutes.get("/patient-histories", authMiddleware, requireRole("KEPALA_PERAWAT"), PatientHistoryController.getAllPatientHistories);

publicRoutes.get("/patient-histories/by-patient/:patientId", authMiddleware, requireRole("KEPALA_PERAWAT"), PatientHistoryController.getPatientHistoryById);

publicRoutes.get("/patient-histories/by-name/:name", authMiddleware, requireRole("KEPALA_PERAWAT"), PatientHistoryController.getPatientHistoryByName);

// nurse history routes
publicRoutes.get("/nurse-histories", authMiddleware, requireRole("kepala_perawat"), NurseHistoryController.getAllNurseHistories);
publicRoutes.get("/nurse-history/:id", authMiddleware, requireRole("kepala_perawat"), NurseHistoryController.getNurseHistoryById);
publicRoutes.get("/nurse-histories/by-name/:name", authMiddleware, requireRole("kepala_perawat"), NurseHistoryController.getNurseHistoryByName);
