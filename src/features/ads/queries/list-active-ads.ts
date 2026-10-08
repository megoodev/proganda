import "server-only";
import { prisma } from "@/lib/prisma";
import { upper } from "@/lib/enum";
import { activeAdsSchema } from "../schemas";
import { toAd } from "../mappers";

/** Public site: published ads whose period includes today. */
export async function listActiveAds(params: { placement?: "home" | "offers" } = {}) {
  const { placement } = activeAdsSchema.parse(params);
  const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`);

  const rows = await prisma.ad.findMany({
    where: {
      published: true,
      startsAt: { lte: today },
      endsAt: { gte: today },
      ...(placement ? { placement: upper(placement) } : {}),
    },
    orderBy: { startsAt: "desc" },
  });
  return rows.map(toAd);
}
