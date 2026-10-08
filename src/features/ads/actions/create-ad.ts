"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { adSchema } from "../schemas";
import { toAd, toAdData } from "../mappers";

export const createAd = adminAction({
  roles: can.ads,
  schema: adSchema,
  audit: { action: "ad_created", entity: "ad", entityId: (_, out) => out.id, details: (input) => input.title },
  revalidate: ["/[locale]/admin/ads", "/[locale]", "/[locale]/offers"],
  handler: async (input) => toAd(await prisma.ad.create({ data: toAdData(input) })),
});
