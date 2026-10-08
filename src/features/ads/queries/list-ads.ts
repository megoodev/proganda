import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toAd } from "../mappers";

export async function listAds() {
  await requireActor(can.ads);
  return (await prisma.ad.findMany({ orderBy: { createdAt: "desc" } })).map(toAd);
}
