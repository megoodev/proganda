import "server-only";
import { prisma } from "@/lib/prisma";
import { toCaseStudy } from "../mappers";

/** Public Case Study page (/portfolio/[slug]): only published ones. */
export async function getCaseStudyBySlug(slug: string) {
  const row = await prisma.caseStudy.findFirst({ where: { slug, published: true }, include: { metrics: true } });
  return row ? toCaseStudy(row) : null;
}
