"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { caseStudyUpdateSchema } from "../schemas";
import { toCaseStudy, toMetricData } from "../mappers";

// The slug never changes on update, so public URLs stay stable.
export const updateCaseStudy = adminAction({
  roles: can.portfolio,
  schema: caseStudyUpdateSchema,
  audit: { action: "portfolio_updated", entity: "portfolio", entityId: (input) => input.id, details: (input) => `${input.brand}: ${input.title}` },
  revalidate: ["/[locale]/admin/portfolio", "/[locale]/portfolio", "/[locale]/portfolio/[slug]", "/[locale]"],
  handler: async ({ id, metrics, ...fields }) =>
    toCaseStudy(
      await prisma.$transaction(async (tx) => {
        await tx.caseStudyMetric.deleteMany({ where: { caseStudyId: id } });
        return tx.caseStudy.update({
          where: { id },
          data: { ...fields, summary: fields.summary || null, metrics: { create: toMetricData(metrics) } },
          include: { metrics: true },
        });
      }),
    ),
});
