import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toShowcaseCreator } from "../mappers";

export async function listShowcaseCreators() {
  await requireActor(can.creators);
  return (await prisma.showcaseCreator.findMany({ orderBy: { createdAt: "desc" } })).map(toShowcaseCreator);
}
