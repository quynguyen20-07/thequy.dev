import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectService {
  async getAllProjects() {
    console.log("--------7777777777777777777777777777777777777--------");
    return prisma.project.findMany({ orderBy: { featured: "desc" } });
  }

  async createProject(data: any) {
    return prisma.project.create({ data });
  }
}
