import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedContactMethods() {
  console.log("🌱 Seeding contact methods...");

  const data = [
    {
      label: "Email",
      value: "quynguyena52000@gmail.com",
      href: "mailto:quynguyena52000@gmail.com",
      description: "Best for project inquiries & job opportunities",
      iconType: "email",
      color: "from-primary-500/20 to-primary-600/10 border-primary-500/30",
      iconColor: "text-primary-400",
      order: 0,
    },
    {
      label: "GitHub",
      value: "github.com/quynguyen20-07",
      href: "https://github.com/quynguyen20-07",
      description: "View my code and open-source contributions",
      iconType: "github",
      color: "from-slate-500/20 to-slate-600/10 border-slate-500/30",
      iconColor: "text-slate-300",
      order: 1,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/nguyen-the-quy",
      href: "https://www.linkedin.com/in/nguyen-the-quy",
      description: "Connect professionally & see my work history",
      iconType: "linkedin",
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      iconColor: "text-blue-400",
      order: 2,
    },
    {
      label: "Phone / WhatsApp",
      value: "+84 944 804 676",
      href: "tel:+84944804676",
      description: "Available Mon–Fri, 8:00 AM – 6:00 PM (GMT+7)",
      iconType: "phone",
      color: "from-green-500/20 to-green-600/10 border-green-500/30",
      iconColor: "text-green-400",
      order: 3,
    },
  ];

  for (const method of data) {
    const existing = await prisma.contactMethod.findFirst({
      where: { label: method.label },
    });

    if (!existing) {
      await prisma.contactMethod.create({ data: method });
      console.log(`  ✅ Created contact method: ${method.label}`);
    } else {
      console.log(`  ⏭️  Skipped contact method (exists): ${method.label}`);
    }
  }
}

if (require.main === module) {
  seedContactMethods()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
