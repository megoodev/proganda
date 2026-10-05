"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema, type SiteSettings } from "../schemas";

export async function updateSettings(values: SiteSettings) {
  // Validate input
  const validated = siteSettingsSchema.parse(values);

  // Get or create settings record
  let settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        siteName: validated.siteName,
        whatsapp: validated.whatsapp,
        email: validated.email,
      },
    });
  } else {
    settings = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        siteName: validated.siteName,
        whatsapp: validated.whatsapp,
        email: validated.email,
      },
    });
  }

  // Handle social links - delete all and recreate
  await prisma.socialLink.deleteMany({
    where: { siteSettingsId: settings.id },
  });

  // Create new social links
  if (validated.socialLinks.length > 0) {
    await prisma.socialLink.createMany({
      data: validated.socialLinks.map((link) => ({
        platform: link.platform,
        title: link.title,
        url: link.url,
        icon: link.icon || null,
        sortOrder: link.sortOrder,
        siteSettingsId: settings.id,
      })),
    });
  }

  // Revalidate settings page
  revalidatePath("/admin/settings");
  revalidatePath("/");

  return { success: true };
}
