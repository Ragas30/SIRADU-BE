// src/routes/routes.js
import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { PasienController } from "../controller/pasien.controller.js";
import { ReposisiHistoryController } from "../controller/reposisiHistory.controller.js";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware.js";
import { PatientHandleController } from "../controller/patientHandle.controller.js";
import { PatientHistoryController } from "../controller/patientHistory.controller.js";
import { NurseHistoryController } from "../controller/nurseHistory.controller.js";
import { TestController } from "../controller/test.controller.js";
import { NurseController } from "../controller/nurse.controller.js";

export const publicRoutes = express.Router();

/** Guard: pastikan argumen route benar2 function */
function asHandler(fn, name = "handler") {
  if (typeof fn !== "function") {
    console.error(`[routes] ${name} bukan function. typeof =`, typeof fn, "nilai =", fn);
    throw new TypeError(`${name} must be a function (got ${typeof fn})`);
  }
  return fn;
}

// ---- contoh pemakaian: asHandler(NurseHistoryController.getAllNurseHistories, "NurseHistoryController.getAllNurseHistories")

publicRoutes.post("/auth/refresh", asHandler(AuthController.refresh, "AuthController.refresh"));
publicRoutes.post("/auth/renew",   asHandler(AuthController.renew,   "AuthController.renew"));
publicRoutes.get("/me", asHandler(authMiddleware, "authMiddleware"), asHandler(requireAuth, "requireAuth"), (req, res) => {
  res.json({ success: true, user: req.user });
});

publicRoutes.get("/test", asHandler(TestController.test, "TestController.test"));

publicRoutes.post("/dashboard/login", asHandler(AuthController.headNurseLogin, "AuthController.headNurseLogin"));
publicRoutes.post("/nurse/login", asHandler(AuthController.nurseLogin, "AuthController.nurseLogin"));
publicRoutes.post("/nurse/add", asHandler(AuthController.nurseRegister, "AuthController.nurseRegister"));
publicRoutes.get("/nurse", asHandler(NurseController.getAllNurse, "NurseController.getAllNurse"));
publicRoutes.put("/nurse/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(NurseController.updateNurse, "NurseController.updateNurse"));
publicRoutes.delete("/nurse/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(NurseController.deleteNurse, "NurseController.deleteNurse"));

publicRoutes.post("/pasienCreate", asHandler(authMiddleware, "authMiddleware"), asHandler(PasienController.createPasien, "PasienController.createPasien"));
publicRoutes.get("/pasiens", asHandler(authMiddleware, "authMiddleware"), asHandler(PasienController.getAllPasiens, "PasienController.getAllPasiens"));
publicRoutes.get("/pasien/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(PasienController.getPasienById, "PasienController.getPasienById"));
publicRoutes.put("/pasien/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(PasienController.updatePasien, "PasienController.updatePasien"));
publicRoutes.delete("/pasien/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(requireAuth, "requireAuth"), asHandler(PasienController.deletePasien, "PasienController.deletePasien"));
publicRoutes.get("/patient-handles", asHandler(authMiddleware, "authMiddleware"), asHandler(requireAuth, "requireAuth"), asHandler(PatientHandleController.getAllPatientHandles, "PatientHandleController.getAllPatientHandles"));
publicRoutes.post("/patient-handle", asHandler(authMiddleware, "authMiddleware"), asHandler(requireAuth, "requireAuth"), asHandler(PatientHandleController.createPatientHandle, "PatientHandleController.createPatientHandle"));
publicRoutes.get("/patient-handles/:id", asHandler(authMiddleware, "authMiddleware"), asHandler(requireAuth, "requireAuth"), asHandler(PatientHandleController.getPatientHandleById, "PatientHandleController.getPatientHandleById"));
publicRoutes.get(
  "/patient-handles/by-nurse/:nurseId",
  asHandler(authMiddleware, "authMiddleware"),
  asHandler(requireAuth, "requireAuth"),
  asHandler(PatientHandleController.getPatientHandleByNurseId, "PatientHandleController.getPatientHandleByNurseId")
);

publicRoutes.post("/reposisiCreate", asHandler(authMiddleware, "authMiddleware"), asHandler(ReposisiHistoryController.createReposisi, "ReposisiHistoryController.createReposisi"));
publicRoutes.get("/reposisis", asHandler(authMiddleware, "authMiddleware"), asHandler(ReposisiHistoryController.getAllReposisis, "ReposisiHistoryController.getAllReposisis"));

publicRoutes.get("/patient-histories", asHandler(authMiddleware, "authMiddleware"), asHandler(PatientHistoryController.getAllPatientHistories, "PatientHistoryController.getAllPatientHistories"));
publicRoutes.get("/patient-histories/by-patient/:patientId", asHandler(authMiddleware, "authMiddleware"), asHandler(PatientHistoryController.getPatientHistoryById, "PatientHistoryController.getPatientHistoryById"));
publicRoutes.get("/patient-histories/by-name/:name", asHandler(authMiddleware, "authMiddleware"), asHandler(PatientHistoryController.getPatientHistoryByName, "PatientHistoryController.getPatientHistoryByName"));

publicRoutes.get("/nurse-histories", asHandler(authMiddleware, "authMiddleware"), asHandler(NurseHistoryController.getAllNurseHistories, "NurseHistoryController.getAllNurseHistories"));
publicRoutes.get("/nurse-histories/by-nurse/:nurseId", asHandler(authMiddleware, "authMiddleware"), asHandler(NurseHistoryController.getNurseHistoryById, "NurseHistoryController.getNurseHistoryById"));
publicRoutes.get("/nurse-histories/by-name/:name", asHandler(authMiddleware, "authMiddleware"), asHandler(NurseHistoryController.getNurseHistoryByName, "NurseHistoryController.getNurseHistoryByName"));

export default publicRoutes;
