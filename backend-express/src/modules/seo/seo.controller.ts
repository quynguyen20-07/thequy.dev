import { handleValidationError } from "@app/utils/error-handler";
import { Request, Response } from "express";

import { PageSeoSchema } from "./seo.validator";
import { SeoService } from "./seo.service";

const service = new SeoService();

export class SeoController {
  /**
   * @openapi
   * /api/seo:
   *   get:
   *     tags: [SEO]
   *     summary: Get all page SEO configurations
   */
  async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAllSeo();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/seo/{page}:
   *   get:
   *     tags: [SEO]
   *     summary: Get SEO config for a specific page
   */
  async getByPage(req: Request, res: Response) {
    try {
      const data = await service.getSeoByPage(
        (req.params as { page: string }).page,
      );
      if (!data) return res.status(404).json({ error: "Not found" });
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/seo:
   *   put:
   *     tags: [SEO]
   *     summary: Upsert SEO config for a page (Admin)
   */
  async upsert(req: Request, res: Response) {
    const result = PageSeoSchema.safeParse(req.body);
    if (!result.success) return handleValidationError(res, result.error);
    try {
      const data = await service.upsertSeo(result.data);
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/seo/{page}:
   *   delete:
   *     tags: [SEO]
   *     summary: Delete SEO config for a page (Admin)
   */
  async deleteSeo(req: Request, res: Response) {
    try {
      await service.deleteSeo((req.params as { page: string }).page);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
