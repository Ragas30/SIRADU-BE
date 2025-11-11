// app/web.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";
import path from "path";
import { publicRoutes } from "../routes/routes.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

export const web = express();

/* CORS */
const RAW_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
].filter(Boolean);
const ORIGINS = RAW_ORIGINS.map(o => o.replace(/\/+$/, ""));
const SUBDOMAIN_ALLOW_REGEX = /\.(example\.com)$/i; // sesuaikan

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    const clean = origin.replace(/\/+$/, "");
    let host = "";
    try { host = new URL(origin).hostname; } catch { return cb(new Error(`Not allowed by CORS ${origin}`)); }
    const ok = ORIGINS.includes(clean) || SUBDOMAIN_ALLOW_REGEX.test(host);
    return ok ? cb(null, true) : cb(new Error(`Not allowed by CORS ${origin}`));
  },
  credentials: true,
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With"],
  exposedHeaders: ["Content-Disposition"],
  optionsSuccessStatus: 204,
};

web.set("trust proxy", 1);

// dev log ringkas
if (process.env.NODE_ENV !== "production") {
  web.use((req, _res, next) => {
    console.log("[REQ]", req.method, req.path, "| Origin:", req.headers.origin || "-", "| xfp:", req.get("x-forwarded-proto") || "-");
    next();
  });
}

web.use(cookieParser());

// Express v5: wildcard OPTIONS
web.options(/.*/, cors(corsOptions));
web.use(cors(corsOptions));

web.use(express.json({ limit: "5mb" }));
web.use(express.urlencoded({ extended: false, limit: "5mb" }));

// CORS error → 403
web.use((err, req, res, next) => {
  if (err?.message?.startsWith("Not allowed by CORS")) {
    return res.status(403).json({ success: false, message: err.message, data: [], total: 0 });
  }
  next(err);
});

// static
web.use("/assets", express.static(path.join(process.cwd(), "assets")));

// swagger ui (read-only, serve at /docs)
const API_ROOT = "/api";

function buildSwaggerServers() {
  const servers = [];
  const fromEnv = (process.env.SWAGGER_BASE_URL || "").trim();
  const fallbackUrl = `http://localhost:${process.env.PORT || 3000}`;
  const primary = (fromEnv || fallbackUrl).replace(/\/+$/, "");
  servers.push({
    url: `${primary}${API_ROOT}`,
    description: fromEnv ? "Configured base URL" : "Local dev",
  });

  const extra = (process.env.SWAGGER_EXTRA_SERVERS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  extra.forEach((url, idx) => {
    servers.push({
      url: url.endsWith("/") ? url.slice(0, -1) : url,
      description: `Extra #${idx + 1}`,
    });
  });

  return servers;
}

const swaggerDoc = JSON.parse(
  readFileSync(path.join(process.cwd(), "assets", "swagger.json"), "utf8")
);

const resolvedSwaggerDoc = (() => {
  const clone = JSON.parse(JSON.stringify(swaggerDoc));
  clone.servers = buildSwaggerServers();
  if (!clone.basePath) clone.basePath = API_ROOT;
  return clone;
})();

web.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(resolvedSwaggerDoc, {
    customSiteTitle: "SIRADU API Docs",
    explorer: true,
  })
);
web.get("/docs.json", (_req, res) => res.json(resolvedSwaggerDoc));

// routes
web.use("/api", publicRoutes);
web.get("/api/test", (_req, res) => res.json({ success: true, message: "Welcome to SIRADU API" }));

// upload/format error
web.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || /Format file tidak didukung/i.test(err?.message || "")) {
    return res.status(422).json({ success: false, message: err.message, data: [], total: 0 });
  }
  next(err);
});

// global error
web.use(ErrorMiddleware);



// web.options(/.*/, cors(corsOptions));
