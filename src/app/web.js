// src/app/web.js
import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerDoc from "../../assets/swagger.json" assert { type: "json" }; // <-- perhatikan path
import { publicRoutes } from "../routes/routes.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";

export const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: false }));

// ===== Swagger UI =====
// web.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
web.get("/docs.json", (_req, res) => res.json(swaggerDoc));

// ===== Routes utama =====
web.use("/api", publicRoutes);

// ===== Error handler =====
web.use(ErrorMiddleware);
