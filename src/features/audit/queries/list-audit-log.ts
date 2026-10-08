import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { listAuditLogSchema } from "../schemas";
import { toAuditEntry } from "../mappers";

type Params = { entity?: string; cursor?: string; take?: number };

/** Cursor pagination: pass `nextCursor` from the previous page as `cursor`. */
export async function listAuditLog(params: Params = {}) {
  await requireActor(can.audit);
  const { entity, cursor, take } = listAuditLogSchema.parse(params);

  const rows = await prisma.auditLog.findMany({
    where: entity ? { entity } : undefined,
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = rows.length > take;
  const items = rows.slice(0, take).map(toAuditEntry);
  return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
}
