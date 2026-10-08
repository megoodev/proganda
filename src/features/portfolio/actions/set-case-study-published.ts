"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { setPublishedSchema } from "../schemas";
import { toCaseStudy } from "../mappers";

export const setCaseStudyPublished = adminAction({
  roles: can.portfolio,
  schema: setPublishedSchema,
  audit: { action: "portfolio_published_changed", entity: "portfolio", entityId: (input) => input.id, details: (input) => (input.published ? "published" : "unpublished") },
  revalidate: ["/[locale]/admin/portfolio", "/[locale]/portfolio", "/[locale]"],
  handler: async ({ id, published }) =>
    toCaseStudy(await prisma.caseStudy.update({ where: { id }, data: { published }, include: { metrics: true } })),
});
