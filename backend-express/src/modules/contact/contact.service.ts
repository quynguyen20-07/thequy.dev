import { PrismaClient } from "@prisma/client";

import type { ContactMethodInput } from "./contact.validator";

const prisma = new PrismaClient();

export class ContactService {
  async getMethods() {
    return prisma.contactMethod.findMany({ orderBy: { order: "asc" } });
  }

  async createMethod(data: ContactMethodInput) {
    return prisma.contactMethod.create({ data });
  }

  async updateMethod(id: string, data: Partial<ContactMethodInput>) {
    return prisma.contactMethod.update({ where: { id }, data });
  }

  async deleteMethod(id: string) {
    return prisma.contactMethod.delete({ where: { id } });
  }
}
