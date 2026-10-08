import "server-only";
import { prisma } from "@/lib/prisma";
import { toService } from "../mappers";

/** Public site. */
export async function listPublishedServices() {
  return (await prisma.service.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } })).map(toService);
}
