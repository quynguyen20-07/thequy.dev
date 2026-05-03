import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // ============================================================================
    // HIGHLIGHTS
    // ============================================================================
    const highlightsData = [
      {
        icon: "⚡",
        title: "REST API Design",
        description:
          "Expert in designing scalable RESTful APIs with proper authentication, authorization, and documentation.",
        color: "text-yellow-400",
        order: 0,
      },
      {
        icon: "🗄️",
        title: "Redis Caching",
        description:
          "Implemented Redis caching strategies that reduced API response times by 40–50% across multiple production systems.",
        color: "text-red-400",
        order: 1,
      },
      {
        icon: "🐳",
        title: "Docker + AWS",
        description:
          "Production deployments with Docker containers on AWS EC2/ECR, S3, and Route 53 with zero-downtime deploys.",
        color: "text-blue-400",
        order: 2,
      },
      {
        icon: "🔄",
        title: "CI/CD Pipelines",
        description:
          "Built automated CI/CD pipelines with GitLab, cutting release cycles from hours to minutes.",
        color: "text-green-400",
        order: 3,
      },
      {
        icon: "🤖",
        title: "AI Integration",
        description:
          "Integrated AI agents for personalized travel recommendations and automated booking processing.",
        color: "text-purple-400",
        order: 4,
      },
      {
        icon: "📡",
        title: "Real-time Systems",
        description:
          "Built real-time communication with Socket.IO and Firebase FCM for notifications and live tracking.",
        color: "text-cyan-400",
        order: 5,
      },
    ];

    for (const highlight of highlightsData) {
      const existing = await prisma.highlight.findUnique({
        where: { title: highlight.title },
      });

      if (!existing) {
        await prisma.highlight.create({ data: highlight });
        console.log(`✅ Created highlight: ${highlight.title}`);
      }
    }

    // ============================================================================
    // EDUCATION
    // ============================================================================
    const educationData = [
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

    for (const edu of educationData) {
      const existing = await prisma.education.findFirst({
        where: { degree: edu.degree },
      });

      if (!existing) {
        await prisma.education.create({ data: edu });
        console.log(`✅ Created education: ${edu.degree}`);
      }
    }

    console.log("✨ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
