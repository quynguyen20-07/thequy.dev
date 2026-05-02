import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { z } from 'zod';

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
  async getProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const validData = CreateProjectSchema.parse(req.body);
      const project = await projectService.createProject(validData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: 'Validation failed', details: error });
    }
  }
}
