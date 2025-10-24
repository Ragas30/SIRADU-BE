// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../lib/error.response.js";
import { generateAccessToken, rotateRefreshToken, verifyAccessToken, verifyRefreshToken, shouldSlideRenew, setAccessCookie, setRefreshCookie, clearAuthCookies, maxAgeFromExp } from "../lib/token.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async headNurseLogin(req, res, next) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.headNurseLogin(req.body);
      setAccessCookie(req, res, accessToken);
      setRefreshCookie(req, res, refreshToken);
      res.status(200).json({ success: true, message: "Login successful", data: { accessToken, user } });
    } catch (e) {
      next(e);
    }
  }

  static async nurseLogin(req, res, next) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.nurseLogin(req.body);
      setAccessCookie(req, res, accessToken);
      setRefreshCookie(req, res, refreshToken);
      res.status(200).json({ success: true, message: "Login successful", data: { accessToken, user } });
    } catch (e) {
      next(e);
    }
  }

  static async nurseRegister(req, res, next) {
    try {
      const data = await AuthService.nurseRegister(req.body);
      res.status(201).json({ success: true, message: "Register successful", data });
    } catch (e) {
      next(e);
    }
  }

  static async autoRenew(req, res, next) {
    try {
      const bearer = req.headers.authorization;
      const at = bearer?.startsWith("Bearer ") ? bearer.split(" ")[1] : req.cookies?.at || null;
      const rt = req.cookies?.rt || req.body?.refreshToken || null;

      const getUser = async (id) =>
        prismaClient.user.findUnique({
          where: { id: String(id) },
          select: { id: true, email: true, role: true, name: true },
        });

      if (at) {
        try {
          const decoded = verifyAccessToken(at);
          const user = await getUser(decoded?.id ?? decoded?.sub);
          if (!user) return next(new ResponseError(401, "User tidak ditemukan"));
          if (shouldSlideRenew(decoded, 5 * 60)) {
            const newAT = generateAccessToken(user);
            setAccessCookie(req, res, newAT);
            return res.status(200).json({ success: true, refreshed: true, rotated: false, accessToken: newAT, user, maxAgeMs: maxAgeFromExp(newAT, 15 * 60_000) });
          }
          return res.status(200).json({ success: true, refreshed: false, rotated: false, accessToken: at, user });
        } catch (e) {
          if (e?.name !== "TokenExpiredError") return next(new ResponseError(401, "Token tidak valid"));
        }
      }

      if (!rt) {
        clearAuthCookies(req, res);
        throw new ResponseError(401, "Refresh token tidak ditemukan");
      }

      try {
        const { accessToken, refreshToken } = await rotateRefreshToken(rt);
        const payload = jwt.decode(accessToken);
        const user = await getUser(payload?.id ?? payload?.sub);
        if (!user) {
          clearAuthCookies(req, res);
          return next(new ResponseError(401, "User tidak ditemukan"));
        }
        setAccessCookie(req, res, accessToken);
        setRefreshCookie(req, res, refreshToken);
        return res.status(200).json({ success: true, refreshed: true, rotated: true, accessToken, user });
      } catch {
        clearAuthCookies(req, res);
        return next(new ResponseError(401, "Refresh token invalid/expired"));
      }
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      const rt = req.cookies?.rt;
      if (rt) {
        try {
          const p = verifyRefreshToken(rt);
          const userId = String(p?.id ?? p?.userId ?? p?.sub ?? "");
          if (userId) await prismaClient.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
        } catch {}
      }
      clearAuthCookies(req, res);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  }
}
