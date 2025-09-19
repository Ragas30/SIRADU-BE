import express from "express";
import { AuthController } from "../controller/auth.controller.js";

export const publicRoutes = express.Router();

publicRoutes.post("/login", AuthController.login);
