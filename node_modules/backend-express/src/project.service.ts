import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectService {
  async getAllProjects() {
    return prisma.project.findMany({ orderBy: { featured: 'desc' } });
  }

  async createProject(data: any) {
    return prisma.project.create({ data });
  }
}
