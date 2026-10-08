import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { assertTypeAccess } from "../access";
import { toRequestDetail } from "../mappers";

export async function getRequest(id: string) {
  const actor = await requireActor(can.requests);
  const row = await prisma.request.findUnique({ where: { id } });
  if (!row) return null;
  assertTypeAccess(actor, row.type);
  return toRequestDetail(row);
}
