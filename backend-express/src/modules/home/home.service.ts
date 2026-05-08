import { PrismaClient } from "@prisma/client";

import type { HomeStatInput } from "./home.validator";

const prisma = new PrismaClient();

export class HomeService {
  async getStats() {
    return prisma.homeStat.findMany({ orderBy: { order: "asc" } });
  }

  async createStat(data: HomeStatInput) {
    return prisma.homeStat.create({ data });
  }

  async updateStat(id: string, data: Partial<HomeStatInput>) {
    return prisma.homeStat.update({ where: { id }, data });
  }

  async deleteStat(id: string) {
    return prisma.homeStat.delete({ where: { id } });
  }
}
