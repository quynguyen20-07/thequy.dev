import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedHomeStats() {
  console.log("🌱 Seeding home stats...");

  const data = [
    { value: "3.5+", label: "Years Experience", order: 0 },
    { value: "5+", label: "Real Projects", order: 1 },
    { value: "10+", label: "Technologies", order: 2 },
    { value: "3", label: "Companies", order: 3 },
  ];

  for (const stat of data) {
    const existing = await prisma.homeStat.findFirst({
      where: { label: stat.label },
    });

    if (!existing) {
      await prisma.homeStat.create({ data: stat });
      console.log(`  ✅ Created home stat: ${stat.label} = ${stat.value}`);
    } else {
      console.log(`  ⏭️  Skipped home stat (exists): ${stat.label}`);
    }
  }
}

if (require.main === module) {
  seedHomeStats()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
