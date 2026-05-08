import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedEducation() {
  console.log("🌱 Seeding education...");

  const data = [
    {
      degree: "Bachelor of Science – Computer Science",
      institution: "University of Greenwich Da Nang",
      period: "2018 – 2023",
      note: "Third-Class Bachelor of Science (22/02/2023). Focus: SDLC, Agile/Scrum, software development, and AI.",
      order: 0,
    },
    {
      degree: "Higher National Diploma – BTEC Computing",
      institution: "FPT Greenwich",
      period: "08/2021",
      note: "Completed an approved HND programme at FPT Greenwich.",
      order: 1,
    },
  ];

  for (const edu of data) {
    const existing = await prisma.education.findFirst({
      where: { degree: edu.degree },
    });

    if (!existing) {
      await prisma.education.create({ data: edu });
      console.log(`  ✅ Created education: ${edu.degree}`);
    } else {
      console.log(`  ⏭️  Skipped education (exists): ${edu.degree}`);
    }
  }
}

if (require.main === module) {
  seedEducation()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
