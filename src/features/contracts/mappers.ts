import { lower } from "@/lib/enum";
import type { ContractRequest } from "./schemas";

type Row = {
  id: string;
  partyType: Parameters<typeof lower>[0];
  status: Parameters<typeof lower>[0];
  notes: string;
  createdAt: Date;
  blogger: { name: string | null } | null; // ✅ السماح بـ null
  brand: { companyName: string | null } | null; // ✅ السماح بـ null
};

export const toContract = (row: Row): ContractRequest => ({
  id: row.id,
  party: row.blogger?.name ?? row.brand?.companyName ?? "—",
  partyType: lower(row.partyType) as ContractRequest["partyType"],
  status: lower(row.status) as ContractRequest["status"],
  notes: row.notes,
  createdAt: row.createdAt.toISOString(),
});