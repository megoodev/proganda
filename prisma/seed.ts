import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create default site settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "ProGanda",
      whatsapp: "+201001234567",
      email: "hello@proganda.studio",
      socialLinks: {
        create: [
          {
            platform: "instagram",
            title: "Instagram",
            url: "https://instagram.com/proganda",
            icon: "instagram",
            sortOrder: 0,
          },
          {
            platform: "tiktok",
            title: "TikTok",
            url: "https://tiktok.com/@proganda",
            icon: "tiktok",
            sortOrder: 1,
          },
          {
            platform: "youtube",
            title: "YouTube",
            url: "https://youtube.com/@proganda",
            icon: "youtube",
            sortOrder: 2,
          },
          {
            platform: "facebook",
            title: "Facebook",
            url: "https://facebook.com/proganda",
            icon: "facebook",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  console.log("Created default settings:", settings);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
