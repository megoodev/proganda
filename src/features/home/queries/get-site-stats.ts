import "server-only";
import { prisma } from "@/lib/prisma";
import { getTotalViews } from "@/features/portfolio/queries/get-total-views";

/** Public Home counters, computed from real data (replaces the hard-coded mock numbers). */
export async function getSiteStats() {
  const [totalViews, campaigns, creators] = await Promise.all([
    getTotalViews(),
     prisma.caseStudy.count({ where: { published: true } }),
     prisma.showcaseCreator.count({ where: { published: true } }),
  ]);
  return { totalViews, campaigns, creators };
}
