import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerDoc from "../../assets/swagger.json" assert { type: "json" };
import { publicRoutes } from "../routes/routes.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const web = express();

const ORIGINS = [
  "http://localhost:3000", // Next.js dev
  "http://localhost:5173", // Vite dev
  process.env.FRONTEND_URL, // contoh: https://fe.domainkamu.com
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

web.use(cookieParser());
web.use(cors(corsOptions));

web.use(express.json());
web.use(express.urlencoded({ extended: false }));

web.use((err, req, res, next) => {
  if (err?.message?.startsWith("Not allowed by CORS")) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
});

// --- Swagger ---
// Jika TIDAK impor swaggerDoc, comment route di bawah:
// web.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// web.get("/docs.json", (_req, res) => res.json(swaggerDoc));

web.use("/api", publicRoutes);

web.get("/api/test", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to SIRADU API",
  });
});

web.use(ErrorMiddleware);
