import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async login(req, res, next) {
    try {
      const request = req.body;
      const result = await AuthService.login(request);
      res.status(201).json({
        success: true,
        message: "Login successful",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const request = req.body;
      const result = await AuthService.register(request);
      res.status(201).json({
        success: true,
        message: "Register successful",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
