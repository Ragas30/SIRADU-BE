export class ReposisiController {
  static async createReposisi(req, res, next) {
    try {
      const request = req.body;
      const result = await ReposisiService.createReposisi(request);
      res.status(201).json({
        success: true,
        message: "Reposisi created successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllReposisis(req, res, next) {
    try {
      const result = await ReposisiService.getAllReposisis();
      res.status(200).json({
        success: true,
        message: "Reposisis fetched successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
