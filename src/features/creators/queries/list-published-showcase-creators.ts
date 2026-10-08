import "server-only";
import { prisma } from "@/lib/prisma";
import { toShowcaseCreator } from "../mappers";

/** Public site: Home carousel and Creators page. */
export async function listPublishedShowcaseCreators() {
  return (await prisma.showcaseCreator.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } })).map(toShowcaseCreator);
}
