import { PrismaClient } from "@prisma/client";

import type { HighlightInput } from "./highlight.validator";

const prisma = new PrismaClient();

export class HighlightService {
  async getAll() {
    return prisma.highlight.findMany({ orderBy: { order: "asc" } });
  }

  async create(data: HighlightInput) {
    return prisma.highlight.create({ data });
  }

  async update(id: string, data: Partial<HighlightInput>) {
    return prisma.highlight.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.highlight.delete({ where: { id } });
  }

  async reorder(items: Array<{ id: string; order: number }>) {
    const updates = items.map((item) =>
      prisma.highlight.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    );
    return prisma.$transaction(updates);
  }
}
