"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { showcaseCreatorUpdateSchema } from "../schemas";
import { toShowcaseCreator } from "../mappers";

export const updateShowcaseCreator = adminAction({
  roles: can.creators,
  schema: showcaseCreatorUpdateSchema,
  audit: { action: "creator_updated", entity: "creator", entityId: (input) => input.id, details: (input) => input.name },
  revalidate: ["/[locale]/admin/creators", "/[locale]", "/[locale]/creators"],
  handler: async ({ id, ...data }) => toShowcaseCreator(await prisma.showcaseCreator.update({ where: { id }, data })),
});
