import type { ProjectInput } from "@app/validators/project.validator";
import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export class ProjectService {
  async getAllProjects(): Promise<Project[]> {
    return prisma.project.findMany({ orderBy: { featured: "desc" } });
  }

  async createProject(data: ProjectInput): Promise<Project> {
    const baseSlug = generateSlug(data.title);
    const slug = `${baseSlug}-${Date.now()}`;
    return prisma.project.create({ data: { ...data, slug } });
  }

  async updateProject(
    id: string,
    data: Partial<ProjectInput>,
  ): Promise<Project> {
    return prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: string): Promise<Project> {
    return prisma.project.delete({ where: { id } });
  }
}
