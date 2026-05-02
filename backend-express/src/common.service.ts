import { PrismaClient, Skill } from "@prisma/client";

const prisma = new PrismaClient();

export class CommonService {
  async getExperiences() {
    return prisma.experience.findMany({ orderBy: { period: "desc" } });
  }

  async getSkills() {
    const skills = await prisma.skill.findMany();
    return skills.reduce((acc: Record<string, string[]>, skill: Skill) => {
      acc[skill.category] = skill.items;
      return acc;
    }, {});
  }

  async getProfile() {
    return prisma.profile.findFirst();
  }

  // Admin CRUD - Experience
  async createExperience(data: {
    company: string;
    role: string;
    period: string;
    current?: boolean;
    description: string;
    tech: string[];
  }) {
    return prisma.experience.create({ data });
  }
  async updateExperience(
    id: string,
    data: {
      company?: string;
      role?: string;
      period?: string;
      current?: boolean;
      description?: string;
      tech?: string[];
    },
  ) {
    return prisma.experience.update({ where: { id }, data });
  }
  async deleteExperience(id: string) {
    return prisma.experience.delete({ where: { id } });
  }

  // Admin CRUD - Skills
  async createSkill(data: { category: string; items: string[] }) {
    return prisma.skill.create({ data });
  }
  async updateSkill(id: string, data: { category?: string; items?: string[] }) {
    return prisma.skill.update({ where: { id }, data });
  }
  async deleteSkill(id: string) {
    return prisma.skill.delete({ where: { id } });
  }

  // Admin CRUD - Profile
  async updateProfile(
    id: string,
    data: {
      name?: string;
      role?: string;
      bio?: string;
      email?: string;
      avatar?: string;
      phone?: string;
      location?: string;
      resume?: string;
      github?: string;
      linkedin?: string;
    },
  ) {
    return prisma.profile.update({ where: { id }, data });
  }
}
