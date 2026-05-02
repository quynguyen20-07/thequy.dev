import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { z } from 'zod';
import { IdParam } from './types/request';

const projectService = new ProjectService();


const CreateProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  responsibilities: z.array(z.string()),
  achievements: z.array(z.string()),
  tech: z.array(z.string()),
  category: z.string(),
  featured: z.boolean().default(false),
  color: z.string(),
  icon: z.string(),
  link: z.string().nullable().optional()
});

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
      res.status(500).json({ error: 'Internal server error' });
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - slug
   *               - title
   *               - company
   *             properties:
   *               slug: { type: string }
   *               title: { type: string }
   *               company: { type: string }
   *     responses:
   *       201:
   *         description: Project created
   */
  async createProject(req: Request, res: Response) {
    try {
      const validData = CreateProjectSchema.parse(req.body);
      const project = await projectService.createProject(validData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: 'Validation failed', details: error });
    }
  }

  async updateProject(req: Request<IdParam>, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.updateProject(id, req.body);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  }

  async deleteProject(req: Request<IdParam>, res: Response) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Delete failed' });
    }
  }
}



