import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toService } from "../mappers";

export async function listServices() {
  await requireActor(can.services);
  return (await prisma.service.findMany({ orderBy: { createdAt: "desc" } })).map(toService);
}
