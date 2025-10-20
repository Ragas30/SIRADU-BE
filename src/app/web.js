import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerDoc from "../../assets/swagger.json" assert { type: "json" };
import { publicRoutes } from "../routes/routes.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

export const web = express();

const ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = ORIGINS.includes(origin);
    return allowed ? callback(null, true) : callback(new Error(`Not allowed by CORS ${origin}`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Disposition"],
  optionsSuccessStatus: 204,
};

web.set("trust proxy", 1);

web.use(cookieParser());
web.use(cors(corsOptions));


web.use(express.json({ limit: "5mb" }));
web.use(express.urlencoded({ extended: false, limit: "5mb" }));

web.use((err, req, res, next) => {
  if (err?.message?.startsWith("Not allowed by CORS")) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
});

// (opsional) static untuk assets
web.use("/assets", express.static(path.join(process.cwd(), "assets")));

// Swagger (aktifkan jika punya swaggerDoc)
// web.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// web.get("/docs.json", (_req, res) => res.json(swaggerDoc));

web.use("/api", publicRoutes);

web.get("/api/test", (_req, res) => {
  res.json({ success: true, message: "Welcome to SIRADU API" });
});

web.use(ErrorMiddleware);
