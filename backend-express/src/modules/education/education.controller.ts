import { handleValidationError } from "@app/utils/error-handler";
import { IdParam } from "@app/types/request";
import { Request, Response } from "express";

import { EducationSchema } from "./education.validator";
import { EducationService } from "./education.service";

const service = new EducationService();

export class EducationController {
  /**
   * @openapi
   * /api/education:
   *   get:
   *     tags: [Education]
   *     summary: Get all education records
   */
  async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validData = EducationSchema.parse(req.body);
      const data = await service.create(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async update(req: Request<IdParam>, res: Response) {
    try {
      const validData = EducationSchema.parse(req.body);
      const data = await service.update(req.params.id, validData);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async delete(req: Request<IdParam>, res: Response) {
    await service.delete(req.params.id);
    res.status(204).send();
  }

  async reorder(req: Request, res: Response) {
    try {
      const data = await service.reorder(req.body);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }
}
