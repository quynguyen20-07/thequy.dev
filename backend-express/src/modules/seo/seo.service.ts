import { PrismaClient } from "@prisma/client";

import type { PageSeoInput } from "./seo.validator";

const prisma = new PrismaClient();

export class SeoService {
  async getAllSeo() {
    return prisma.pageSeo.findMany();
  }

  async getSeoByPage(page: string) {
    return prisma.pageSeo.findUnique({ where: { page } });
  }

  async upsertSeo(data: PageSeoInput) {
    return prisma.pageSeo.upsert({
      where: { page: data.page },
      update: data,
      create: data,
    });
  }

  async deleteSeo(page: string) {
    return prisma.pageSeo.delete({ where: { page } });
  }
}
