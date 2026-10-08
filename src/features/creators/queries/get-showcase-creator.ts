import "server-only";
import { prisma } from "@/lib/prisma";
import { toShowcaseCreator } from "../mappers";

/** Public profile page: only published creators are returned. */
export async function getPublishedShowcaseCreator(id: string) {
  const row = await prisma.showcaseCreator.findFirst({ where: { id, published: true } });
  return row ? toShowcaseCreator(row) : null;
}
