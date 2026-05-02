import { Request, Response } from 'express';
import { CommonService } from './common.service';

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
}
