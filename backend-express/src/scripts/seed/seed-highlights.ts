import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedHighlights() {
  console.log("🌱 Seeding highlights...");

  const data = [
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

  for (const highlight of data) {
    const existing = await prisma.highlight.findUnique({
      where: { title: highlight.title },
    });

    if (!existing) {
      await prisma.highlight.create({ data: highlight });
      console.log(`  ✅ Created highlight: ${highlight.title}`);
    } else {
      console.log(`  ⏭️  Skipped highlight (exists): ${highlight.title}`);
    }
  }
}

if (require.main === module) {
  seedHighlights()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
