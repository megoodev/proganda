"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { brandIdSchema } from "../schemas";

export const deleteBrand = adminAction({
  roles: can.brands,
  schema: brandIdSchema,
  audit: { action: "brand_deleted", entity: "brand", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/brands", "/[locale]/admin/contracts", "/[locale]/admin"],
  handler: async ({ id }) => {
    await prisma.brandProfile.delete({ where: { id } });
    return { id };
  },
});
