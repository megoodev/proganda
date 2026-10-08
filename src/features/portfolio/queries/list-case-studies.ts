import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toCaseStudy } from "../mappers";

export async function listCaseStudies() {
  await requireActor(can.portfolio);
  const rows = await prisma.caseStudy.findMany({ include: { metrics: true }, orderBy: { createdAt: "desc" } });
  return rows.map(toCaseStudy);
}
