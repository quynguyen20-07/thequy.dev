import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runMigration() {
  console.log("Starting data migration to MongoDB...");

  // Load data dynamically to avoid ESM/CJS issues
  const { projects, experiences, skills } = await import("../../../frontend/src/data/projects");


  // 1. Migrate Projects
  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.id },
      update: {
        title: proj.title,
        role: proj.role,
        company: proj.company,
        period: proj.period,
        shortDescription: proj.shortDescription,
        description: proj.description,
        responsibilities: proj.responsibilities,
        achievements: proj.achievements,
        tech: proj.tech,
        category: proj.category,
        featured: proj.featured,
        color: proj.color,
        icon: proj.icon,
        link: proj.link,
      },
      create: {
        slug: proj.id,
        title: proj.title,
        role: proj.role,
        company: proj.company,
        period: proj.period,
        shortDescription: proj.shortDescription,
        description: proj.description,
        responsibilities: proj.responsibilities,
        achievements: proj.achievements,
        tech: proj.tech,
        category: proj.category,
        featured: proj.featured,
        color: proj.color,
        icon: proj.icon,
        link: proj.link,
      },
    });
  }
  console.log(`Migrated ${projects.length} projects.`);

  // 2. Migrate Experiences
  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: exp.company, role: exp.role },
    });

    if (!existing) {
      await prisma.experience.create({
        data: {
          company: exp.company,
          role: exp.role,
          period: exp.period,
          current: exp.current,
          description: exp.description,
          tech: exp.tech,
        },
      });
    }
  }
  console.log(`Migrated ${experiences.length} experiences.`);

  // 3. Migrate Skills
  for (const [category, items] of Object.entries(skills)) {
    await prisma.skills.upsert({
      where: { category },
      update: { items: items as string[] },
      create: { category, items: items as string[] },
    });
  }
  console.log("Migrated skills.");

  console.log("Migration complete!");
}

runMigration()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
