import type { AuditEntry } from "./schemas";

// Phase C: insert into the AuditLog table (Prisma). Call it from EVERY sensitive Server Action
// (delete, status change, contract review, role change, settings update) after the permission check.
export async function logAction(entry: Omit<AuditEntry, "id" | "createdAt">) {
  console.info("[audit]", entry);
}
