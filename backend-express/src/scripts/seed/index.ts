import { PrismaClient } from "@prisma/client";

import { seedContactMethods } from "./seed-contact";
import { seedHighlights } from "./seed-highlights";
import { seedEducation } from "./seed-education";
import { seedHomeStats } from "./seed-home";
import { seedSeo } from "./seed-seo";

const prisma = new PrismaClient();

const MODULES: Record<string, () => Promise<void>> = {
  highlights: seedHighlights,
  education: seedEducation,
  home: seedHomeStats,
  contact: seedContactMethods,
  seo: seedSeo,
};

async function main() {
  const module = process.argv[2];

  if (module) {
    const seedFn = MODULES[module];
    if (!seedFn) {
      console.error(`❌ Unknown module: "${module}"`);
      console.error(`   Available: ${Object.keys(MODULES).join(", ")}`);
      process.exit(1);
    }

    console.log(`\n🌱 Running seed: ${module}\n`);
    await seedFn();
  } else {
    console.log(`\n🌱 Running all seed modules...\n`);
    for (const [name, seedFn] of Object.entries(MODULES)) {
      console.log(`\n--- ${name} ---`);
      await seedFn();
    }
  }

  console.log("\n✨ Seed completed!\n");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  });
