import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toAd } from "../mappers";

export async function getAd(id: string) {
  await requireActor(can.ads);
  const row = await prisma.ad.findUnique({ where: { id } });
  return row ? toAd(row) : null;
}
