import { PrismaClient } from "@prisma/client";

import type { ProfileInput } from "./profile.validator";

const prisma = new PrismaClient();

export class ProfileService {
  async get() {
    return prisma.profile.findFirst();
  }

  async update(id: string, data: Partial<ProfileInput>) {
    return prisma.profile.update({ where: { id }, data });
  }
}
