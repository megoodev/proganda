import "server-only";
import { prisma } from "@/lib/prisma";

/** Sum of views across all published case studies (Home page counters). */
export async function getTotalViews() {
  const result = await prisma.caseStudyMetric.aggregate({
    _sum: { views: true },
    where: { caseStudy: { published: true } },
  });
  return Number(result._sum.views ?? 0);
}
