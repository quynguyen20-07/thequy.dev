import {
  ExperienceSchema,
  SkillSchema,
  ProfileSchema,
  HighlightSchema,
  EducationSchema,
} from "@app/validators/common.validator";
import { handleValidationError } from "@app/utils/error-handler";
import { CommonService } from "@app/common.service";
import { IdParam } from "@app/types/request";
import { Request, Response } from "express";

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
      res.status(500).json({ error: "Internal server error" });
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
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/highlights:
   *   get:
   *     tags: [Common]
   *     summary: Get all highlights
   */
  async getHighlights(req: Request, res: Response) {
    try {
      const data = await commonService.getHighlights();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/education:
   *   get:
   *     tags: [Common]
   *     summary: Get all education
   */
  async getEducation(req: Request, res: Response) {
    try {
      const data = await commonService.getEducation();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // ============================================================================
  // ADMIN ENDPOINTS - Experience
  // ============================================================================

  async createExperience(req: Request, res: Response) {
    try {
      const validData = ExperienceSchema.parse(req.body);
      const data = await commonService.createExperience(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async updateExperience(req: Request<IdParam>, res: Response) {
    try {
      const validData = ExperienceSchema.parse(req.body);
      const data = await commonService.updateExperience(
        req.params.id,
        validData,
      );
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async deleteExperience(req: Request<IdParam>, res: Response) {
    await commonService.deleteExperience(req.params.id);
    res.status(204).send();
  }

  // ============================================================================
  // ADMIN ENDPOINTS - Skill
  // ============================================================================

  async createSkill(req: Request, res: Response) {
    try {
      const validData = SkillSchema.parse(req.body);
      const data = await commonService.createSkill(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async updateSkill(req: Request<IdParam>, res: Response) {
    const data = await commonService.updateSkill(req.params.id, req.body);
    res.json(data);
  }

  async deleteSkill(req: Request<IdParam>, res: Response) {
    await commonService.deleteSkill(req.params.id);
    res.status(204).send();
  }

  // ============================================================================
  // ADMIN ENDPOINTS - Highlight
  // ============================================================================

  async createHighlight(req: Request, res: Response) {
    try {
      const validData = HighlightSchema.parse(req.body);
      const data = await commonService.createHighlight(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async updateHighlight(req: Request<IdParam>, res: Response) {
    try {
      const validData = HighlightSchema.parse(req.body);
      const data = await commonService.updateHighlight(
        req.params.id,
        validData,
      );
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async deleteHighlight(req: Request<IdParam>, res: Response) {
    await commonService.deleteHighlight(req.params.id);
    res.status(204).send();
  }

  async reorderHighlights(req: Request, res: Response) {
    try {
      const data = await commonService.reorderHighlights(req.body);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  // ============================================================================
  // ADMIN ENDPOINTS - Education
  // ============================================================================

  async createEducation(req: Request, res: Response) {
    try {
      const validData = EducationSchema.parse(req.body);
      const data = await commonService.createEducation(validData);
      res.status(201).json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async updateEducation(req: Request<IdParam>, res: Response) {
    try {
      const validData = EducationSchema.parse(req.body);
      const data = await commonService.updateEducation(
        req.params.id,
        validData,
      );
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async deleteEducation(req: Request<IdParam>, res: Response) {
    await commonService.deleteEducation(req.params.id);
    res.status(204).send();
  }

  async reorderEducation(req: Request, res: Response) {
    try {
      const data = await commonService.reorderEducation(req.body);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  // ============================================================================
  // ADMIN ENDPOINTS - Profile
  // ============================================================================

  async updateProfile(req: Request<IdParam>, res: Response) {
    try {
      const validData = ProfileSchema.parse(req.body);
      const data = await commonService.updateProfile(req.params.id, validData);
      res.json(data);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }
}
