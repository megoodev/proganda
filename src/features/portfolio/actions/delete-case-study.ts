"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { caseStudyIdSchema } from "../schemas";

export const deleteCaseStudy = adminAction({
  roles: can.portfolio,
  schema: caseStudyIdSchema,
  audit: { action: "portfolio_deleted", entity: "portfolio", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/portfolio", "/[locale]/portfolio", "/[locale]"],
  handler: async ({ id }) => {
    await prisma.caseStudy.delete({ where: { id } }); // metrics are removed by the cascade
    return { id };
  },
});
