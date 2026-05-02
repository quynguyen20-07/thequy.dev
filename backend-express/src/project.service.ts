import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectService {
  async getAllProjects() {
    return prisma.project.findMany({ orderBy: { featured: "desc" } });
  }

  async createProject(data: any) {
    return prisma.project.create({ data });
  }

  async updateProject(id: string, data: any) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
}

