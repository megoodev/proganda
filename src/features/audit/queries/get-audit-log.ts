import { z } from "zod";
import { auditEntrySchema } from "../schemas";
import { mockAudit } from "../mock-audit";

// Phase A: mock. Phase C: Prisma, with cursor pagination.
export async function getAuditLog() {
  return z.array(auditEntrySchema).parse(mockAudit).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
