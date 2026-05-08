import { handleValidationError } from "@app/utils/error-handler";
import { IdParam } from "@app/types/request";
import { Request, Response } from "express";

import { SkillSchema } from "./skill.validator";
import { SkillService } from "./skill.service";

const service = new SkillService();

export class SkillController {
  /**
   * @openapi
   * /api/skills:
   *   get:
   *     tags: [Skill]
   *     summary: Get all skills (grouped by category)
   */
  async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/skills/raw:
   *   get:
   *     tags: [Skill]
   *     summary: Get skills as raw array (Admin)
   */
  async getRaw(req: Request, res: Response) {
    try {
      const data = await service.getAllRaw();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validData = SkillSchema.parse(req.body);
      const data = await service.create(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async update(req: Request<IdParam>, res: Response) {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
  }

  async delete(req: Request<IdParam>, res: Response) {
    await service.delete(req.params.id);
    res.status(204).send();
  }
}
