import jwt from "jsonwebtoken";
import { ResponseError } from "../lib/error.response.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET / JWT_SECRET tidak ditemukan di environment");

// pola sederhana JWT: 2/3 segmen base64url dipisah titik
const jwtLike = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+(\.[A-Za-z0-9\-_]+)?$/;

function rejectJwtInUrl(req) {
  if (typeof req.query?.token === "string" && req.query.token.trim())
    throw new ResponseError(400, "Jangan kirim token di query");
  for (const [k, v] of Object.entries(req.query || {})) {
    if (typeof v === "string" && jwtLike.test(v)) throw new ResponseError(400, `Nilai query '${k}' tidak valid`);
  }
  for (const [k, v] of Object.entries(req.params || {})) {
    if (typeof v === "string" && jwtLike.test(v)) throw new ResponseError(400, `Nilai param '${k}' tidak valid`);
  }
}

export function authMiddleware(req, res, next) {
  try {
    rejectJwtInUrl(req);

    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new ResponseError(401, "Authorization header tidak ditemukan");
    const [scheme, token] = String(authHeader).split(" ");
    if ((scheme || "").toLowerCase() !== "bearer" || !token)
      throw new ResponseError(401, "Authorization harus format: Bearer <token>");

    const decoded = jwt.verify(token, ACCESS_SECRET);
    const userId = decoded?.id ?? decoded?.userId ?? decoded?.sub;
    if (!userId) throw new ResponseError(401, "Token tidak memuat id user");

    let roles = [];
    if (Array.isArray(decoded?.roles)) roles = decoded.roles.filter(Boolean).map(String);
    else if (decoded?.role) roles = [String(decoded.role)];
    const rolesLower = roles.map((r) => r.toLowerCase());

    req.user = { ...decoded, id: userId, roles, rolesLower };
    req.isHeadNurse = rolesLower.includes("kepala_perawat");
    req.canAccessNurse = (nurseId) => req.isHeadNurse || String(req.user?.id || "") === String(nurseId || "");
    next();
  } catch (err) {
    if (err?.name === "TokenExpiredError") return next(new ResponseError(401, "Token kedaluwarsa"));
    if (err?.name === "JsonWebTokenError") return next(new ResponseError(401, "Token tidak valid"));
    next(err instanceof ResponseError ? err : new ResponseError(401, err?.message || "Unauthorized"));
  }
}

export function requireAuth(req, res, next) {
  if (!req.user?.id) return next(new ResponseError(401, "Unauthorized"));
  next();
}

export function requireSelfOrHeadNurse(paramKey = "nurseId") {
  return (req, res, next) => {
    const val = req.params?.[paramKey] ?? req.query?.[paramKey];
    if (typeof val === "string" && jwtLike.test(val)) return next(new ResponseError(400, `Nilai '${paramKey}' tidak valid`));
    if (!req.canAccessNurse(val)) return next(new ResponseError(403, "Forbidden"));
    next();
  };
}
