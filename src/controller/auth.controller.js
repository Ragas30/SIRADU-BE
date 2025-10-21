import jwt from "jsonwebtoken";
import { ResponseError } from "../lib/error.response.js";
import { prismaClient } from "../app/database.js";
import { generateAccessToken, generateAndStoreRefreshToken, rotateRefreshToken, verifyAccessToken, verifyRefreshToken, shouldSlideRenew } from "../lib/token.js";
import { AuthService } from "../services/auth.service.js";

function maxAgeFromExp(token, fallbackMs) {
  try {
    const d = jwt.decode(token);
    const now = Math.floor(Date.now() / 1000);
    const exp = d?.exp ?? now + Math.ceil((fallbackMs ?? 60_000) / 1000);
    return Math.max(0, (exp - now) * 1000);
  } catch {
    return fallbackMs ?? 60_000;
  }
}

function isCrossSiteEnv() {
  return String(process.env.CROSS_SITE_COOKIES || "false") === "true";
}

function buildCookieOptions(req, { crossSite, maxAge }) {
  const isProd = process.env.NODE_ENV === "production";
  const viaProxyHttps = req.get?.("x-forwarded-proto")?.includes("https");
  const isHttps = req.secure || viaProxyHttps;

  if (crossSite) {
    if (!isHttps) {
      throw new ResponseError(500, "Cross-site cookie membutuhkan HTTPS. Gunakan HTTPS (mkcert/ngrok/dev-tunnel) atau proxy FE→BE agar same-origin.");
    }
    return {
      httpOnly: true,
      secure: true, // penting untuk SameSite=None
      sameSite: "none",
      path: "/",
      maxAge,
    };
  }

  return {
    httpOnly: true,
    secure: isHttps || isProd,
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

function setAccessCookie(req, res, token, options) {
  const crossSite = options?.crossSite ?? isCrossSiteEnv();
  const opts = buildCookieOptions(req, {
    crossSite,
    maxAge: maxAgeFromExp(token, 1000 * 60 * 15),
  });
  res.cookie("at", token, opts);
}

function setRefreshCookie(req, res, token, options) {
  const crossSite = options?.crossSite ?? isCrossSiteEnv();
  const opts = buildCookieOptions(req, {
    crossSite,
    maxAge: maxAgeFromExp(token, 1000 * 60 * 60 * 24 * 7),
  });
  res.cookie("rt", token, opts);
}

function clearAuthCookies(req, res, options) {
  const crossSite = options?.crossSite ?? isCrossSiteEnv();
  const dummyOpts = buildCookieOptions(req, { crossSite, maxAge: 0 });
  res.clearCookie("at", { ...dummyOpts });
  res.clearCookie("rt", { ...dummyOpts });
}

export class AuthController {
  // POST /auth/head-nurse/login
  static async headNurseLogin(req, res, next) {
    try {
      const result = await AuthService.headNurseLogin(req.body);
      const payloadUser = result.user;

      const accessToken = generateAccessToken(payloadUser);
      const refreshToken = await generateAndStoreRefreshToken(payloadUser);

      setAccessCookie(req, res, accessToken);
      setRefreshCookie(req, res, refreshToken);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          user: {
            id: payloadUser.id,
            name: payloadUser.name,
            email: payloadUser.email,
            role: payloadUser.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /auth/nurse/login
  static async nurseLogin(req, res, next) {
    try {
      const result = await AuthService.nurseLogin(req.body);
      const payloadUser = result.user;

      const accessToken = generateAccessToken(payloadUser);
      const refreshToken = await generateAndStoreRefreshToken(payloadUser);

      setAccessCookie(req, res, accessToken);
      setRefreshCookie(req, res, refreshToken);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          user: {
            id: payloadUser.id,
            name: payloadUser.name,
            email: payloadUser.email,
            role: payloadUser.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async nurseRegister(req, res, next) {
    try {
      const data = await AuthService.nurseRegister(req.body);
      return res.status(201).json({
        success: true,
        message: "Register successful",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const rt = req.cookies?.rt;
      if (!rt) throw new ResponseError(401, "Refresh token tidak ada");

      const { accessToken, refreshToken } = await rotateRefreshToken(rt);

      setAccessCookie(req, res, accessToken);
      setRefreshCookie(req, res, refreshToken);

      return res.status(200).json({ success: true, accessToken });
    } catch (err) {
      const msg = String(err?.message || "");
      if (/expired/i.test(msg)) return next(new ResponseError(401, "Refresh token kedaluwarsa"));
      if (/not recognized/i.test(msg)) return next(new ResponseError(401, "Refresh token tidak dikenali"));
      return next(err);
    }
  }

  static async renew(req, res, next) {
    try {
      const bearer = req.headers["authorization"];
      const token = bearer?.startsWith("Bearer ") ? bearer.split(" ")[1] : req.cookies?.at || null;

      if (!token) throw new ResponseError(401, "Authorization harus Bearer atau cookie 'at'");

      let decoded;
      try {
        decoded = verifyAccessToken(token);
      } catch (e) {
        if (e?.name === "TokenExpiredError") return next(new ResponseError(401, "Token kedaluwarsa, silakan login ulang"));
        return next(new ResponseError(401, "Token tidak valid"));
      }

      if (!shouldSlideRenew(decoded)) {
        return res.status(200).json({ success: true, accessToken: token, slid: false });
      }

      const user = await prismaClient.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, role: true },
      });
      const newAccess = generateAccessToken(user);

      setAccessCookie(req, res, newAccess);

      return res.status(200).json({ success: true, accessToken: newAccess, slid: true });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const rt = req.cookies?.rt;
      if (rt) {
        try {
          const payload = verifyRefreshToken(rt);
          const userId = String(payload?.id ?? payload?.userId ?? payload?.sub ?? "");
          if (userId) {
            await prismaClient.refreshToken.updateMany({
              where: { userId, revokedAt: null },
              data: { revokedAt: new Date() },
            });
          }
        } catch {
          // ignore verify error on logout
        }
      }

      clearAuthCookies(req, res);
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
