// Run: npx tsx prisma/seed.ts   (set SEED_ADMIN_EMAIL / SEED_ADMIN_NAME first)
// Creates the first super admin. The account is linked to the logged-in user by email on first login.
import { prisma } from "../src/lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  if (!email) throw new Error("Set SEED_ADMIN_EMAIL before seeding");

  await prisma.staffProfile.upsert({
    where: { email },
    create: { email, name: process.env.SEED_ADMIN_NAME ?? "Admin", adminRole: "SUPER_ADMIN" },
    update: { adminRole: "SUPER_ADMIN", active: true },
  });
await prisma.siteSettings.upsert({
  where: { id: "site" },
  create: { id: "site" },
  update: {},
});
}

main().finally(() => prisma.$disconnect());
