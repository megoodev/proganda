import type { AuditEntry } from "./schemas";

type AuditRow = { id: string; actorId: string; actorName: string; action: string; entity: string; entityId: string; details: string; createdAt: Date };

export const toAuditEntry = (row: AuditRow): AuditEntry => ({
  id: row.id,
  actorId: row.actorId,
  actorName: row.actorName,
  action: row.action as AuditEntry["action"],
  entity: row.entity as AuditEntry["entity"],
  entityId: row.entityId,
  details: row.details,
  createdAt: row.createdAt.toISOString(),
});
