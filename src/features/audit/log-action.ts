import "server-only";
import { prisma } from "@/lib/prisma";
import type { AuditEntry } from "./schemas";

// Called automatically by adminAction (the `audit` option). The log is append-only: no update/delete.
export async function logAction(entry: Omit<AuditEntry, "id" | "createdAt">) {
  await prisma.auditLog.create({ data: entry });
}
