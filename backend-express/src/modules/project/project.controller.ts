import { handleValidationError } from "@app/utils/error-handler";
import { IdParam } from "@app/types/request";
import { Request, Response } from "express";

import { ProjectSchema } from "./project.validator";
import { ProjectService } from "./project.service";

const projectService = new ProjectService();

export class ProjectController {
  /**
   * @openapi
   * /api/projects:
   *   get:
   *     tags:
   *       - Projects
   *     summary: Get all projects
   *     responses:
   *       200:
   *         description: List of projects
   */
  async getProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/projects:
   *   post:
   *     tags:
   *       - Projects
   *     summary: Create a new project
   *     security:
   *       - bearerAuth: []
   */
  async createProject(req: Request, res: Response) {
    try {
      const validData = ProjectSchema.parse(req.body);
      const project = await projectService.createProject(validData);
      res.status(201).json(project);
    } catch (error) {
      return handleValidationError(res, error);
    }
  }

  async updateProject(req: Request<IdParam>, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.updateProject(id, req.body);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Update failed" });
    }
  }

  async deleteProject(req: Request<IdParam>, res: Response) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Delete failed" });
    }
  }
}
