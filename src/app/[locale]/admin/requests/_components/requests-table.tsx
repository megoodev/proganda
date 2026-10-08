"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { useAdminRole } from "@/features/admin/admin-role-context";
import type { AdminUser } from "@/features/admin/schemas";
import { assignRequest } from "@/features/requests/actions/assign-request";
import { updateRequestStatus } from "@/features/requests/actions/update-request-status";
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

  const allowedTypes = role ? typesForRole[role] : [];

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

  const columns = useRequestColumns({
    admins,
    onAssign: async (id, adminId) => {
      const result = await assignRequest({ id, assignedToId: adminId });
      if (result.ok) setRows((prev) => prev.map((row) => (row.id === id ? result.data : row)));
    },
    onStatus: async (id, status) => {
      const result = await updateRequestStatus({ id, status });
      if (result.ok) setRows((prev) => prev.map((row) => (row.id === id ? result.data : row)));
    },
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
