import { ReposisiHistoryService } from "../services/reposisiHistory.service.js";

export class ReposisiHistoryController {
  // POST /reposisi
  static async createReposisi(req, res, next) {
    try {
      let foto;
      if (req.file) {
        foto = {
          type: req.file.mimetype,
          size: req.file.size,
          data: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        };
      }

      const payload = {
        patientId: req.body?.patientId,
        bradenQ: req.body?.bradenQ,
        position: req.body?.position,
        foto,
        nurseIdFromAuth: req.user?.id,
      };

      const result = await ReposisiHistoryService.createReposition(payload);

      res.status(201).json({
        success: true,
        message: "Reposisi dibuat & jadwal berikutnya diperbarui",
        data: [result.history],
        nextRepositionTime: result.nextRepositionTime,
        total: 1,
      });
    } catch (err) {
      const status = Number(err?.status) || 500;
      return res.status(status).json({
        success: false, message: err.message || "Error", data: [], total: 0,
      });
    }
  }
}
