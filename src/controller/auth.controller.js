import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async nurseLogin(req, res, next) {
    try {
      const request = req.body;
      const result = await AuthService.nurseLogin(request);
      res.status(200).json({
        success: true,
        message: "Login successful",
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async nurseRegister(req, res, next) {
    try {
      const request = req.body;
      const result = await AuthService.nurseRegister(request);

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
