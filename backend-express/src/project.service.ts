import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export class ProjectService {
  async getAllProjects() {
    return prisma.project.findMany({ orderBy: { featured: "desc" } });
  }

  async createProject(data: any) {
    return prisma.project.create({ data });
  }
}
