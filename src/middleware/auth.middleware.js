import jwt from "jsonwebtoken";
import { ResponseError } from "../lib/error.response.js";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new ResponseError(401, "Authorization header tidak ditemukan");

    const [scheme, token] = authHeader.split(" ");
    if ((scheme || "").toLowerCase() !== "bearer" || !token) {
      throw new ResponseError(401, "Authorization harus format: Bearer <token>");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new ResponseError(500, "JWT_SECRET tidak ditemukan di environment");

    const decoded = jwt.verify(token, secret);
    if (!decoded?.id) throw new ResponseError(401, "Token tidak memuat id user");

    let roles = [];
    if (Array.isArray(decoded.roles)) {
      roles = decoded.roles.filter(Boolean).map((r) => String(r));
    } else if (decoded.role) {
      roles = [String(decoded.role)];
    }

    const rolesLower = roles.map((r) => r.toLowerCase());

    req.user = { ...decoded, roles, rolesLower };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ResponseError(401, "Token kedaluwarsa, silakan login ulang"));
    }
    if (err.name === "JsonWebTokenError") {
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

    // DEBUG sementara
    // console.log("[ROLE] allowed:", [...allowedLower]);
    // console.log("[ROLE] user.rolesLower:", rolesLower);
    // console.log("[ROLE] ok:", ok);

    if (!ok) return next(new ResponseError(403, "Forbidden"));
    next();
  };
}
