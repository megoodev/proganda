import { z } from "zod";

export const auditEntities = ["request", "contract", "portfolio", "ad", "admin", "settings"] as const;
export const auditActions = [
  "request_assigned", "request_status_changed", "contract_approved", "contract_rejected",
  "portfolio_created", "portfolio_deleted", "ad_created", "admin_role_changed", "settings_updated",
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

export type AuditEntry = z.infer<typeof auditEntrySchema>;
