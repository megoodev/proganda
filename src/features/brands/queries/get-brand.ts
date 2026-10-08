import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toBrandDetail } from "../mappers";

export async function getBrand(id: string) {
  await requireActor(can.brands);
  const row = await prisma.brandProfile.findUnique({ where: { id } });
  return row ? toBrandDetail(row) : null;
}
