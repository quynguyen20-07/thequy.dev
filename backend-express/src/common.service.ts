import { PrismaClient, Skill } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================================================
// PUBLIC QUERIES (For Frontend)
// ============================================================================

export class CommonService {
  async getExperiences() {
    return prisma.experience.findMany({ orderBy: { startDate: "desc" } });
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

  async getHighlights() {
    return prisma.highlight.findMany({ orderBy: { order: "asc" } });
  }

  async getEducation() {
    return prisma.education.findMany({ orderBy: { order: "asc" } });
  }

  // ============================================================================
  // ADMIN CRUD - Experience
  // ============================================================================

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

  // ============================================================================
  // ADMIN CRUD - Skills
  // ============================================================================

  async createSkill(data: { category: string; items: string[] }) {
    return prisma.skill.create({ data });
  }

  async updateSkill(id: string, data: { category?: string; items?: string[] }) {
    return prisma.skill.update({ where: { id }, data });
  }

  async deleteSkill(id: string) {
    return prisma.skill.delete({ where: { id } });
  }

  // ============================================================================
  // ADMIN CRUD - Highlight
  // ============================================================================

  async createHighlight(data: {
    icon: string;
    title: string;
    description: string;
    color: string;
    order?: number;
  }) {
    return prisma.highlight.create({ data });
  }

  async updateHighlight(
    id: string,
    data: {
      icon?: string;
      title?: string;
      description?: string;
      color?: string;
      order?: number;
    },
  ) {
    return prisma.highlight.update({ where: { id }, data });
  }

  async deleteHighlight(id: string) {
    return prisma.highlight.delete({ where: { id } });
  }

  async reorderHighlights(items: Array<{ id: string; order: number }>) {
    const updates = items.map((item) =>
      prisma.highlight.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    );
    return prisma.$transaction(updates);
  }

  // ============================================================================
  // ADMIN CRUD - Education
  // ============================================================================

  async createEducation(data: {
    degree: string;
    institution: string;
    period: string;
    note: string;
    order?: number;
  }) {
    return prisma.education.create({ data });
  }

  async updateEducation(
    id: string,
    data: {
      degree?: string;
      institution?: string;
      period?: string;
      note?: string;
      order?: number;
    },
  ) {
    return prisma.education.update({ where: { id }, data });
  }

  async deleteEducation(id: string) {
    return prisma.education.delete({ where: { id } });
  }

  async reorderEducation(items: Array<{ id: string; order: number }>) {
    const updates = items.map((item) =>
      prisma.education.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    );
    return prisma.$transaction(updates);
  }

  // ============================================================================
  // ADMIN CRUD - Profile
  // ============================================================================

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
