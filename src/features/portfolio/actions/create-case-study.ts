"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { uniqueSlug } from "@/lib/slug";
import { can } from "@/features/admin/permissions";
import { caseStudySchema } from "../schemas";
import { toCaseStudy, toMetricData } from "../mappers";

export const createCaseStudy = adminAction({
  roles: can.portfolio,
  schema: caseStudySchema,
  audit: { action: "portfolio_created", entity: "portfolio", entityId: (_, out) => out.id, details: (input) => `${input.brand}: ${input.title}` },
  revalidate: ["/[locale]/admin/portfolio", "/[locale]/portfolio", "/[locale]"],
  handler: async (input) => {
    const slug = await uniqueSlug(`${input.brand} ${input.title}`, async (candidate) =>
      !!(await prisma.caseStudy.findUnique({ where: { slug: candidate }, select: { id: true } })),
    );

    const row = await prisma.caseStudy.create({
      data: {
        slug,
        brand: input.brand,
        title: input.title,
        goal: input.goal,
        summary: input.summary || null,
        published: input.published,
        metrics: { create: toMetricData(input.metrics) },
      },
      include: { metrics: true },
    });
    return toCaseStudy(row);
  },
});
