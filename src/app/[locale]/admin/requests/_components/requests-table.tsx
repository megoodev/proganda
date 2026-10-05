"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { useAdminRole } from "@/features/admin/admin-role-context";
import type { AdminUser } from "@/features/admin/mock-admins";
import type { AdminRequest } from "@/features/requests/schemas";
import { typesForRole } from "@/features/requests/role-types";
import { useRequestColumns } from "./requests-columns";
import { RequestsFilters, defaultFilters, type Filters } from "./requests-filters";

type Props = { initialRequests: AdminRequest[]; admins: AdminUser[] };

export function RequestsTable({ initialRequests, admins }: Props) {
  const t = useTranslations("admin.requests");
  const { role } = useAdminRole();
  const [rows, setRows] = useState(initialRequests);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const allowedTypes = typesForRole[role];

  const visible = useMemo(
    () =>
      rows.filter(
        (row) =>
          allowedTypes.includes(row.type) &&
          (filters.type === "all" || row.type === filters.type) &&
          (filters.status === "all" || row.status === filters.status) &&
          (filters.assignee === "all" ||
            (filters.assignee === "unassigned" ? row.assignedTo === null : row.assignedTo === filters.assignee)),
      ),
    [rows, filters, allowedTypes],
  );

  // Phase C: these become Server Actions (assign-request.ts, update-request-status.ts) + audit log entries.
  const columns = useRequestColumns({
    admins,
    onAssign: (id, adminId) => setRows((prev) => prev.map((row) => (row.id === id ? { ...row, assignedTo: adminId } : row))),
    onStatus: (id, status) => setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row))),
  });

  return (
    <DataTable
      columns={columns}
      data={visible}
      search={{ placeholder: t("searchPlaceholder"), getText: (row) => `${row.from} ${row.subject}` }}
      filters={<RequestsFilters value={filters} onChange={setFilters} allowedTypes={allowedTypes} admins={admins} />}
      empty={<EmptyState icon={Inbox} title={t("empty.title")} description={t("empty.description")} />}
    />
  );
}
