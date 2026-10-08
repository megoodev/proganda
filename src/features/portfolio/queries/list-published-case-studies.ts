import "server-only";
import { prisma } from "@/lib/prisma";
import { toCaseStudy } from "../mappers";

/** Public Portfolio page. */
export async function listPublishedCaseStudies() {
  const rows = await prisma.caseStudy.findMany({
    where: { published: true },
    include: { metrics: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toCaseStudy);
}
