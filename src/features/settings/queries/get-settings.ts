import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSettings = cache(async () => {
  return prisma.siteSettings.findFirst({
    include: {
      socialLinks: { orderBy: { sortOrder: "asc" } },
    },
  });
});