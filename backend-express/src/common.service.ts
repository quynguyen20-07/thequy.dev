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

  // Admin CRUD - Experience
  async createExperience(data: any) {
    return prisma.experience.create({ data });
  }
  async updateExperience(id: string, data: any) {
    return prisma.experience.update({ where: { id }, data });
  }
  async deleteExperience(id: string) {
    return prisma.experience.delete({ where: { id } });
  }

  // Admin CRUD - Skills
  async createSkill(data: any) {
    return prisma.skills.create({ data });
  }
  async updateSkill(id: string, data: any) {
    return prisma.skills.update({ where: { id }, data });
  }
  async deleteSkill(id: string) {
    return prisma.skills.delete({ where: { id } });
  }

  // Admin CRUD - Profile
  async updateProfile(id: string, data: any) {
    return prisma.profile.update({ where: { id }, data });
  }
}

