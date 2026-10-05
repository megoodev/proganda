import type { AuditEntry } from "./schemas";

export const mockAudit: AuditEntry[] = [
  { id: "l1", actorId: "a1", actorName: "منى سامي", action: "admin_role_changed", entity: "admin", entityId: "a3", details: "creator_manager ← hr", createdAt: "2026-10-03T10:05:00+03:00" },
  { id: "l2", actorId: "a2", actorName: "أحمد فاروق", action: "request_assigned", entity: "request", entityId: "r2", details: "تم التوزيع على أحمد فاروق", createdAt: "2026-10-03T09:40:00+03:00" },
  { id: "l3", actorId: "a3", actorName: "سارة عادل", action: "contract_approved", entity: "contract", entityId: "ct4", details: "Zad Trips", createdAt: "2026-10-02T17:20:00+03:00" },
  { id: "l4", actorId: "a2", actorName: "أحمد فاروق", action: "portfolio_created", entity: "portfolio", entityId: "c1", details: "حملة صيف 2026", createdAt: "2026-10-02T12:10:00+03:00" },
  { id: "l5", actorId: "a5", actorName: "هدى مصطفى", action: "ad_created", entity: "ad", entityId: "ad2", details: "منيو الشتاء من Bite Burgers", createdAt: "2026-10-01T15:00:00+03:00" },
  { id: "l6", actorId: "a2", actorName: "أحمد فاروق", action: "portfolio_deleted", entity: "portfolio", entityId: "c9", details: "عمل تجريبي", createdAt: "2026-09-30T11:30:00+03:00" },
  { id: "l7", actorId: "a3", actorName: "سارة عادل", action: "contract_rejected", entity: "contract", entityId: "ct5", details: "ليلى حسن", createdAt: "2026-09-29T14:00:00+03:00" },
  { id: "l8", actorId: "a1", actorName: "منى سامي", action: "settings_updated", entity: "settings", entityId: "site", details: "رقم WhatsApp", createdAt: "2026-09-28T10:00:00+03:00" },
];
