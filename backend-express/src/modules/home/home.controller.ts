import { handleValidationError } from "@app/utils/error-handler";
import { Request, Response } from "express";

import { HomeStatSchema } from "./home.validator";
import { HomeService } from "./home.service";

const service = new HomeService();

export class HomeController {
  /**
   * @openapi
   * /api/home/stats:
   *   get:
   *     tags: [Home]
   *     summary: Get home page stats
   */
  async getStats(req: Request, res: Response) {
    try {
      const data = await service.getStats();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/home/stats:
   *   post:
   *     tags: [Home]
   *     summary: Create a home stat (Admin)
   */
  async createStat(req: Request, res: Response) {
    const result = HomeStatSchema.safeParse(req.body);
    if (!result.success) return handleValidationError(res, result.error);
    try {
      const data = await service.createStat(result.data);
      res.status(201).json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/home/stats/{id}:
   *   put:
   *     tags: [Home]
   *     summary: Update a home stat (Admin)
   */
  async updateStat(req: Request, res: Response) {
    const result = HomeStatSchema.partial().safeParse(req.body);
    if (!result.success) return handleValidationError(res, result.error);
    try {
      const data = await service.updateStat(
        (req.params as { id: string }).id,
        result.data,
      );
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/home/stats/{id}:
   *   delete:
   *     tags: [Home]
   *     summary: Delete a home stat (Admin)
   */
  async deleteStat(req: Request, res: Response) {
    try {
      await service.deleteStat((req.params as { id: string }).id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
