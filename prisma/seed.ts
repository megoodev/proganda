import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "../src/lib/auth";
import { brands, creators, serviceTiers } from "../src/lib/data";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to seed the CMS.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    for (const [index, creator] of creators.entries()) {
      await prisma.creator.upsert({
        where: { slug: creator.id },
        update: {
          name: creator.name,
          handle: creator.handle,
          niche: creator.niche,
          platforms: creator.platforms,
          reach: creator.reach,
          engagement: creator.engagement,
          location: creator.location,
          image: creator.image,
          accent: creator.accent,
          published: true,
          sortOrder: index,
        },
        create: {
          slug: creator.id,
          name: creator.name,
          handle: creator.handle,
          niche: creator.niche,
          platforms: creator.platforms,
          reach: creator.reach,
          engagement: creator.engagement,
          location: creator.location,
          image: creator.image,
          accent: creator.accent,
          published: true,
          sortOrder: index,
        },
      });
    }

    for (const [index, brand] of brands.entries()) {
      await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {
          name: brand.name,
          industry: brand.industry,
          campaign: brand.campaign,
          description: brand.description,
          services: brand.services,
          views: brand.views,
          roi: brand.roi,
          color: brand.color,
          published: true,
          sortOrder: index,
        },
        create: {
          slug: brand.slug,
          name: brand.name,
          industry: brand.industry,
          campaign: brand.campaign,
          description: brand.description,
          services: brand.services,
          views: brand.views,
          roi: brand.roi,
          color: brand.color,
          published: true,
          sortOrder: index,
        },
      });
    }

    for (const [index, tier] of serviceTiers.entries()) {
      await prisma.serviceTier.upsert({
        where: { id: tier.id },
        update: {
          name: tier.name,
          eyebrow: tier.eyebrow,
          scope: tier.scope,
          offer: tier.offer,
          features: tier.features,
          savingsRate: tier.savingsRate,
          accent: tier.accent,
          published: true,
          sortOrder: index,
        },
        create: {
          id: tier.id,
          name: tier.name,
          eyebrow: tier.eyebrow,
          scope: tier.scope,
          offer: tier.offer,
          features: tier.features,
          savingsRate: tier.savingsRate,
          accent: tier.accent,
          published: true,
          sortOrder: index,
        },
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      const existing = await prisma.user.findUnique({
        where: { email: adminEmail },
      });
      if (!existing) {
        await auth.api.signUpEmail({
          body: {
            email: adminEmail,
            password: adminPassword,
            name: "ProGanda Admin",
            role: "brand",
          },
        });
      }
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin", banned: false },
      });
      console.log(`Admin account ready: ${adminEmail}`);
    } else {
      console.log(
        "Skip admin user seed. Set ADMIN_EMAIL and ADMIN_PASSWORD to create one.",
      );
    }

    console.log("CMS seed complete.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
