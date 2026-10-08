import { lower } from "@/lib/enum";
import type { AdminRequest, RequestDetail } from "./schemas";

type Row = {
  id: string; type: Parameters<typeof lower>[0]; status: Parameters<typeof lower>[0]; fromName: string; fromEmail: string;
  fromPhone: string | null; subject: string; message: string | null; payload: unknown; attachmentUrl: string | null;
  assignedToId: string | null; createdAt: Date;
};

export const toAdminRequest = (row: Row): AdminRequest => ({
  id: row.id,
  type: lower(row.type) as AdminRequest["type"],
  from: row.fromName,
  subject: row.subject,
  status: lower(row.status) as AdminRequest["status"],
  assignedTo: row.assignedToId,
  createdAt: row.createdAt.toISOString(),
});

export const toRequestDetail = (row: Row): RequestDetail => ({
  ...toAdminRequest(row),
  email: row.fromEmail,
  phone: row.fromPhone ?? undefined,
  message: row.message ?? undefined,
  payload: (row.payload ?? {}) as Record<string, unknown>,
  attachmentUrl: row.attachmentUrl ?? undefined,
});
