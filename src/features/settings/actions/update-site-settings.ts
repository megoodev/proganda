"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { siteSettingsSchema } from "../schemas";
import { toSiteSettings } from "../mappers";

export const updateSiteSettings = adminAction({
  roles: can.settings,
  schema: siteSettingsSchema,
  audit: { action: "settings_updated", entity: "settings", entityId: () => "site", details: (_, out) => out.changed.join(", ") },
  revalidate: ["/[locale]/admin/settings", "/[locale]", "/[locale]/contact"],
  handler: async (input) => {
    const before = await prisma.siteSettings.findUnique({ where: { id: "site" } });
    
    // Extract socialLinks for separate handling
    const { socialLinks, ...settingsData } = input;
    
    const row = await prisma.$transaction(async (tx) => {
      // Upsert main settings
      const settings = await tx.siteSettings.upsert({
        where: { id: "site" },
        create: {
          id: "site",
          ...settingsData,
        },
        update: settingsData,
      });

      // Delete all existing social links
      await tx.socialLink.deleteMany({
        where: { siteSettingsId: settings.id },
      });

      // Create new social links
      if (socialLinks.length > 0) {
        await tx.socialLink.createMany({
          data: socialLinks.map((link) => ({
            platform: link.platform,
            title: link.title,
            url: link.url,
            icon: link.icon || null,
            sortOrder: link.sortOrder,
            siteSettingsId: settings.id,
          })),
        });
      }

      return settings;
    });

    const changed = (Object.keys(input) as (keyof typeof input)[]).filter((key) => before?.[key] !== input[key]);
    return { settings: toSiteSettings(row), changed: changed as string[] };
  },
});
