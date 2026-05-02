import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CommonService {
  async getExperiences() {
    return prisma.experience.findMany({ orderBy: { period: 'desc' } });
  }

  async getSkills() {
    const skills = await prisma.skills.findMany();
    return skills.reduce((acc: any, skill) => {
      acc[skill.category] = skill.items;
      return acc;
    }, {});
  }

  async getProfile() {
    return prisma.profile.findFirst();
  }
}
