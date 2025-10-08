import jwt from "jsonwebtoken";
import { ResponseError } from "../lib/error.response.js";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new ResponseError(401, "Authorization header tidak ditemukan");

    const token = authHeader.split(" ")[1];
    if (!token) throw new ResponseError(401, "Token tidak valid");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new ResponseError(500, "JWT_SECRET tidak ditemukan di environment");

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    next(new ResponseError(401, "Token tidak valid"));
  }
}
