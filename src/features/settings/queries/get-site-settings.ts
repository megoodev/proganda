import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { toSiteSettings } from "../mappers";

/** Single-row table ("site"), created on first read. Public: the footer/contact page use it. De-duplicated per request. */
export const getSiteSettings = cache(async () =>
  toSiteSettings(
    await prisma.siteSettings.upsert({
      where: { id: "site" },
      create: {
        id: "site",
        siteName: "ProGanda",
        email: "",
        whatsapp: "",
      },
      update: {},
      include: {
        socialLinks: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    }),
  ),
);
