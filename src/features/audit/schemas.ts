import { z } from "zod";

export const auditEntities = [
  "request", "contract", "portfolio", "service", "creator", "ad", "blogger", "brand", "admin", "chat", "settings",
] as const;

export const auditActions = [
  "request_assigned", "request_status_changed", "request_deleted",
  "contract_approved", "contract_rejected", "contract_reset", "contract_deleted",
  "portfolio_created", "portfolio_updated", "portfolio_deleted", "portfolio_published_changed",
  "service_created", "service_updated", "service_deleted",
  "creator_created", "creator_updated", "creator_deleted",
  "ad_created", "ad_updated", "ad_deleted",
  "blogger_status_changed", "blogger_deleted", "brand_status_changed", "brand_deleted",
  "admin_created", "admin_updated", "admin_role_changed", "admin_active_changed", "admin_deleted",
  "conversation_assigned", "message_deleted", "settings_updated",
] as const;

export const auditEntrySchema = z.object({
  id: z.string(),
  actorId: z.string(),
  actorName: z.string(),
  action: z.enum(auditActions),
  entity: z.enum(auditEntities),
  entityId: z.string(),
  details: z.string(),
  createdAt: z.string(),
});

export const listAuditLogSchema = z.object({
  entity: z.enum(auditEntities).optional(),
  cursor: z.string().optional(),
  take: z.number().int().min(1).max(100).default(50),
});

export type AuditAction = (typeof auditActions)[number];
export type AuditEntity = (typeof auditEntities)[number];
export type AuditEntry = z.infer<typeof auditEntrySchema>;
