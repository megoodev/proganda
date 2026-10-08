import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toService } from "../mappers";

export async function getService(id: string) {
  await requireActor(can.services);
  const row = await prisma.service.findUnique({ where: { id } });
  return row ? toService(row) : null;
}
