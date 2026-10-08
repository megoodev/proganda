"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { adUpdateSchema } from "../schemas";
import { toAd, toAdData } from "../mappers";

export const updateAd = adminAction({
  roles: can.ads,
  schema: adUpdateSchema,
  audit: { action: "ad_updated", entity: "ad", entityId: (input) => input.id, details: (input) => input.title },
  revalidate: ["/[locale]/admin/ads", "/[locale]", "/[locale]/offers"],
  handler: async ({ id, ...input }) => toAd(await prisma.ad.update({ where: { id }, data: toAdData(input) })),
});
