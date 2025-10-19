import { generateAccessToken, generateAndStoreRefreshToken } from "../lib/token.js";
import { AuthService } from "../services/auth.service.js";

function setRefreshCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("rt", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}
export class AuthController {
  static async headNurseLogin(req, res, next) {
    try {
      const user = await AuthService.headNurseLogin(req.body);

      const accessToken = generateAccessToken(user);
      const refreshToken = await generateAndStoreRefreshToken(user);
      setRefreshCookie(res, refreshToken);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          user: {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async nurseLogin(req, res, next) {
    try {
      const user = await AuthService.nurseLogin(req.body);

      const accessToken = generateAccessToken(user);
      const refreshToken = await generateAndStoreRefreshToken(user);
      setRefreshCookie(res, refreshToken);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          user: {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async nurseRegister(req, res, next) {
    try {
      const result = await AuthService.nurseRegister(req.body);
      res.status(201).json({
        success: true,
        message: "Register successful",
        result,
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
      setRefreshCookie(res, refreshToken);

      res.status(200).json({ success: true, accessToken });
    } catch (err) {
      next(err);
    }
  }

  static async renew(req, res, next) {
    try {
      const bearer = req.headers["authorization"];
      if (!bearer?.startsWith("Bearer ")) {
        throw new ResponseError(401, "Authorization harus Bearer");
      }
      const token = bearer.split(" ")[1];

      const decoded = verifyAccessToken(token); // throw jika invalid/expired
      if (!shouldSlideRenew(decoded)) {
        return res.status(200).json({ success: true, accessToken: token, slid: false });
      }

      const user = await prismaClient.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, role: true },
      });
      const newAccess = generateAccessToken(user);

      res.status(200).json({ success: true, accessToken: newAccess, slid: true });
    } catch (err) {
      next(err);
    }
  }
}
