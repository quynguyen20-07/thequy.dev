import { PrismaClient } from "@prisma/client";

import type { ExperienceInput } from "./experience.validator";

const prisma = new PrismaClient();

export class ExperienceService {
  async getAll() {
    return prisma.experience.findMany({ orderBy: { startDate: "desc" } });
  }

  async create(data: ExperienceInput) {
    return prisma.experience.create({ data });
  }

  async update(id: string, data: Partial<ExperienceInput>) {
    return prisma.experience.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.experience.delete({ where: { id } });
  }
}
