import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toCaseStudy } from "../mappers";

/** Dashboard edit page. */
export async function getCaseStudy(id: string) {
  await requireActor(can.portfolio);
  const row = await prisma.caseStudy.findUnique({ where: { id }, include: { metrics: true } });
  return row ? toCaseStudy(row) : null;
}
