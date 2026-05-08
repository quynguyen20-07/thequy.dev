import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSeo() {
  console.log("🌱 Seeding SEO...");

  const data = [
    {
      page: "home",
      title: "Fullstack Developer | Node.js & NestJS Developer Vietnam",
      description:
        "The Quy Nguyen – Fullstack Developer specializing in Node.js, NestJS, and React. Based in Vietnam. Available for remote work and freelance projects.",
      keywords:
        "Node.js developer Vietnam, NestJS developer, Fullstack developer Vietnam, The Quy Nguyen, backend developer, React developer",
      path: "/",
    },
    {
      page: "about",
      title: "About · Fullstack Developer Node.js NestJS Vietnam",
      description:
        "The Quy Nguyen is a Fullstack Developer with 3.5+ years building scalable backend systems with Node.js, NestJS, Express, and React.",
      keywords:
        "about The Quy Nguyen, Node.js developer background, NestJS experience, fullstack developer Vietnam biography",
      path: "/about",
    },
    {
      page: "contact",
      title: "Contact · The Quy Nguyen – Node.js Fullstack Developer",
      description:
        "Get in touch with The Quy Nguyen. Available for freelance projects, job opportunities, and collaboration.",
      keywords:
        "contact The Quy Nguyen, hire Node.js developer Vietnam, freelance backend developer, remote developer Vietnam",
      path: "/contact",
    },
    {
      page: "projects",
      title: "Projects · Node.js & NestJS Developer Vietnam",
      description:
        "Explore The Quy Nguyen's portfolio projects — TripC AI platform, NestJS microservices, React dashboards, and more.",
      keywords:
        "TripC AI platform NestJS, portfolio projects Node.js developer, NestJS microservices project, React dashboard portfolio",
      path: "/projects",
    },
  ];

  for (const seo of data) {
    const existing = await prisma.pageSeo.findUnique({
      where: { page: seo.page as any },
    });

    if (!existing) {
      await prisma.pageSeo.create({ data: seo as any });
      console.log(`  ✅ Created SEO for page: ${seo.page}`);
    } else {
      console.log(`  ⏭️  Skipped SEO (exists): ${seo.page}`);
    }
  }
}

if (require.main === module) {
  seedSeo()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
