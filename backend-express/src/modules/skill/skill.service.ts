import { PrismaClient, Skill } from "@prisma/client";

import type { SkillInput } from "./skill.validator";

const prisma = new PrismaClient();

export class SkillService {
  async getAll(): Promise<Record<string, string[]>> {
    const skills = await prisma.skill.findMany();
    return skills.reduce((acc: Record<string, string[]>, skill: Skill) => {
      acc[skill.category] = skill.items;
      return acc;
    }, {});
  }

  async getAllRaw() {
    return prisma.skill.findMany({ orderBy: { category: "asc" } });
  }

  async create(data: SkillInput) {
    return prisma.skill.create({ data });
  }

  async update(id: string, data: Partial<SkillInput>) {
    return prisma.skill.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.skill.delete({ where: { id } });
  }
}
