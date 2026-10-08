"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { adIdSchema } from "../schemas";

export const deleteAd = adminAction({
  roles: can.ads,
  schema: adIdSchema,
  audit: { action: "ad_deleted", entity: "ad", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/ads", "/[locale]", "/[locale]/offers"],
  handler: async ({ id }) => {
    await prisma.ad.delete({ where: { id } });
    return { id };
  },
});
