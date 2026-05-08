import { handleValidationError } from "@app/utils/error-handler";
import { IdParam } from "@app/types/request";
import { Request, Response } from "express";

import { ProfileSchema } from "./profile.validator";
import { ProfileService } from "./profile.service";

const service = new ProfileService();

export class ProfileController {
  /**
   * @openapi
   * /api/profile:
   *   get:
   *     tags: [Profile]
   *     summary: Get profile information
   */
  async get(req: Request, res: Response) {
    try {
      const data = await service.get();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request<IdParam>, res: Response) {
    try {
      const validData = ProfileSchema.parse(req.body);
      const data = await service.update(req.params.id, validData);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }
}
