import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async login(req, res) {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  }
}
