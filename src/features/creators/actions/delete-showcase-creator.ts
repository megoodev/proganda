"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { showcaseCreatorIdSchema } from "../schemas";

export const deleteShowcaseCreator = adminAction({
  roles: can.creators,
  schema: showcaseCreatorIdSchema,
  audit: { action: "creator_deleted", entity: "creator", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/creators", "/[locale]", "/[locale]/creators"],
  handler: async ({ id }) => {
    await prisma.showcaseCreator.delete({ where: { id } });
    return { id };
  },
});
