import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toBloggerDetail } from "../mappers";

export async function getBlogger(id: string) {
  await requireActor(can.bloggers);
  const row = await prisma.bloggerProfile.findUnique({ where: { id } });
  return row ? toBloggerDetail(row) : null;
}
