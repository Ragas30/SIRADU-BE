export class TestController {
  static async test(req, res) {
    res.json({ success: true, message: "Welcome to SIRADU API" });
  }
}
