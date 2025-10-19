import jwt from "jsonwebtoken";
import { ResponseError } from "../lib/error.response.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET / JWT_SECRET tidak ditemukan di environment");

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new ResponseError(401, "Authorization header tidak ditemukan");

    const [scheme, token] = String(authHeader).split(" ");
    if ((scheme || "").toLowerCase() !== "bearer" || !token) {
      throw new ResponseError(401, "Authorization harus format: Bearer <token>");
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);

    // Terima id dari beberapa claim umum
    const userId = decoded?.id ?? decoded?.userId ?? decoded?.sub;
    if (!userId) throw new ResponseError(401, "Token tidak memuat id user");

    // Normalisasi roles
    let roles = [];
    if (Array.isArray(decoded?.roles)) {
      roles = decoded.roles.filter(Boolean).map(String);
    } else if (decoded?.role) {
      roles = [String(decoded.role)];
    }
    const rolesLower = roles.map((r) => r.toLowerCase());

    // set ke req.user (sertakan id hasil normalisasi)
    req.user = { ...decoded, id: userId, roles, rolesLower };
    next();
  } catch (err) {
    if (err?.name === "TokenExpiredError") {
      return next(new ResponseError(401, "Token kedaluwarsa, silakan login ulang"));
    }
    if (err?.name === "JsonWebTokenError") {
      return next(new ResponseError(401, "Token tidak valid"));
    }
    next(err instanceof ResponseError ? err : new ResponseError(401, "Token tidak valid"));
  }
}

export function requireAuth(req, res, next) {
  if (!req.user?.id) return next(new ResponseError(401, "Unauthorized"));
  next();
}

export function requireRole(...allowed) {
  const allowedLower = new Set(allowed.map((a) => String(a).toLowerCase()));
  return (req, res, next) => {
    const rolesLower = req.user?.rolesLower || [];
    const ok = rolesLower.some((r) => allowedLower.has(r));
    if (!ok) return next(new ResponseError(403, "Forbidden"));
    next();
  };
}
