import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async login(req, res, next) {
    try {
      const request = req.body;
      const result = await AuthService.login(request);
      res.status(200).json({
        success: true,
        message: "Login successful",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Tetap satu endpoint "register", tapi diarahkan ke service sesuai role
  static async register(req, res, next) {
    try {
      const request = req.body;

      if (!request?.role) {
        return res.status(400).json({
          success: false,
          message: "Role wajib diisi (perawat/kepala_perawat)",
        });
      }

      let result;
      if (request.role === "perawat") {
        result = await AuthService.registerPerawat(request);
      } else if (request.role === "kepala_perawat") {
        result = await AuthService.registerKepalaPerawat(request);
      } else {
        return res.status(400).json({
          success: false,
          message: "Role tidak valid (perawat/kepala_perawat)",
        });
      }

      res.status(201).json({
        success: true,
        message: "Register successful",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
