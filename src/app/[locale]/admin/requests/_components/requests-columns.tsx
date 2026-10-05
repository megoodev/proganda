"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import type { AdminColumnDef } from "@/components/shared/data-table";
import { PersonCell } from "@/components/shared/person-cell";
import { formatDate } from "@/lib/format";
import type { AdminUser } from "@/features/admin/mock-admins";
import { requestStatuses, type AdminRequest, type RequestStatus } from "@/features/requests/schemas";

type Params = {
  admins: AdminUser[];
  onAssign: (id: string, adminId: string | null) => void;
  onStatus: (id: string, status: RequestStatus) => void;
};

export function useRequestColumns({ admins, onAssign, onStatus }: Params) {
  const t = useTranslations("admin.requests");
  const locale = useLocale();

  return useMemo<AdminColumnDef<AdminRequest>[]>(
    () => [
      {
        accessorKey: "from",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.from")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.from} />,
        size: 200,
      },
      {
        accessorKey: "type",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.type")} column={column} />,
        cell: ({ row }) => <Badge variant="secondary">{t(`types.${row.original.type}`)}</Badge>,
        size: 120,
      },
      {
        accessorKey: "subject",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.subject")} column={column} />,
        cell: ({ row }) => <span className="line-clamp-1 text-foreground">{row.original.subject}</span>,
        size: 260,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.status")} column={column} />,
        cell: ({ row }) => (
          <Select value={row.original.status} onValueChange={(value) => onStatus(row.original.id, value as RequestStatus)}>
            <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              {requestStatuses.map((status) => <SelectItem key={status} value={status}>{t(`statuses.${status}`)}</SelectItem>)}
            </SelectContent>
          </Select>
        ),
        size: 170,
      },
      {
        accessorKey: "assignedTo",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.assignedTo")} column={column} />,
        cell: ({ row }) => (
          <Select
            value={row.original.assignedTo ?? "unassigned"}
            onValueChange={(value) => onAssign(row.original.id, value === "unassigned" ? null : value)}
          >
            <SelectTrigger className="h-8 w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">{t("unassigned")}</SelectItem>
              {admins.map((admin) => <SelectItem key={admin.id} value={admin.id}>{admin.name}</SelectItem>)}
            </SelectContent>
          </Select>
        ),
        size: 180,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.date")} column={column} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(row.original.createdAt, locale)}</span>,
        size: 130,
      },
    ],
    [t, locale, admins, onAssign, onStatus],
  );
}
