import { PrismaClient } from "@prisma/client";

import type { EducationInput } from "./education.validator";

const prisma = new PrismaClient();

export class EducationService {
  async getAll() {
    return prisma.education.findMany({ orderBy: { order: "asc" } });
  }

  async create(data: EducationInput) {
    return prisma.education.create({ data });
  }

  async update(id: string, data: Partial<EducationInput>) {
    return prisma.education.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.education.delete({ where: { id } });
  }

  async reorder(items: Array<{ id: string; order: number }>) {
    const updates = items.map((item) =>
      prisma.education.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    );
    return prisma.$transaction(updates);
  }
}
