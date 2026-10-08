"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { showcaseCreatorSchema } from "../schemas";
import { toShowcaseCreator } from "../mappers";

export const createShowcaseCreator = adminAction({
  roles: can.creators,
  schema: showcaseCreatorSchema,
  audit: { action: "creator_created", entity: "creator", entityId: (_, out) => out.id, details: (input) => input.name },
  revalidate: ["/[locale]/admin/creators", "/[locale]", "/[locale]/creators"],
  handler: async (input) => toShowcaseCreator(await prisma.showcaseCreator.create({ data: input })),
});
