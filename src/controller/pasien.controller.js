export class PasienController {
  static async createPasien(req, res, next) {
    try {
      const request = req.body;
      const result = await PasienService.createPasien(request);
      res.status(201).json({
        success: true,
        message: "Pasien created successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPasiens(req, res, next) {
    try {
      const result = await PasienService.getAllPasiens();
      res.status(200).json({
        success: true,
        message: "Pasiens fetched successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPasienById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PasienService.getPasienById(id);
      res.status(200).json({
        success: true,
        message: "Pasien fetched successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePasien(req, res, next) {
    try {
      const id = req.params.id;
      const request = req.body;
      const result = await PasienService.updatePasien(id, request);
      res.status(200).json({
        success: true,
        message: "Pasien updated successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePasien(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PasienService.deletePasien(id);
      res.status(200).json({
        success: true,
        message: "Pasien deleted successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
