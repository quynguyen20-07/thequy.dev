import { Request, Response } from 'express';
import { CommonService } from '@app/common.service';
import { IdParam } from '@app/types/request';

const commonService = new CommonService();

export class CommonController {

  /**
   * @openapi
   * /api/experiences:
   *   get:
   *     tags: [Common]
   *     summary: Get all work experiences
   */
  async getExperiences(req: Request, res: Response) {
    try {
      const data = await commonService.getExperiences();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * @openapi
   * /api/skills:
   *   get:
   *     tags: [Common]
   *     summary: Get all skills
   */
  async getSkills(req: Request, res: Response) {
    try {
      const data = await commonService.getSkills();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * @openapi
   * /api/profile:
   *   get:
   *     tags: [Common]
   *     summary: Get profile information
   */
  async getProfile(req: Request, res: Response) {
    try {
      const data = await commonService.getProfile();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Admin Endpoints
  async createExperience(req: Request, res: Response) {
    const data = await commonService.createExperience(req.body);
    res.status(201).json(data);
  }

  async updateExperience(req: Request<IdParam>, res: Response) {
    const data = await commonService.updateExperience(req.params.id, req.body);
    res.json(data);
  }

  async deleteExperience(req: Request<IdParam>, res: Response) {
    await commonService.deleteExperience(req.params.id);
    res.status(204).send();
  }

  async createSkill(req: Request, res: Response) {
    const data = await commonService.createSkill(req.body);
    res.status(201).json(data);
  }

  async updateSkill(req: Request<IdParam>, res: Response) {
    const data = await commonService.updateSkill(req.params.id, req.body);
    res.json(data);
  }

  async deleteSkill(req: Request<IdParam>, res: Response) {
    await commonService.deleteSkill(req.params.id);
    res.status(204).send();
  }

  async updateProfile(req: Request<IdParam>, res: Response) {
    const data = await commonService.updateProfile(req.params.id, req.body);
    res.json(data);
  }
}



