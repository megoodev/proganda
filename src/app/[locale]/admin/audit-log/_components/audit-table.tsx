"use client";

import { useMemo, useState } from "react";
import { ScrollText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { formatDateTime } from "@/lib/format";
import { auditEntities, type AuditEntry } from "@/features/audit/schemas";

export function AuditTable({ entries }: { entries: AuditEntry[] }) {
  const t = useTranslations("admin.audit");
  const tCommon = useTranslations("admin.common");
  const locale = useLocale();
  const [entity, setEntity] = useState("all");

  const visible = useMemo(() => entries.filter((entry) => entity === "all" || entry.entity === entity), [entries, entity]);

  const columns = useMemo<AdminColumnDef<AuditEntry>[]>(
    () => [
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.time")} column={column} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDateTime(row.original.createdAt, locale)}</span>,
        size: 190,
      },
      {
        accessorKey: "actorName",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.admin")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.actorName} />,
        size: 200,
      },
      {
        accessorKey: "action",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.action")} column={column} />,
        cell: ({ row }) => <span className="font-medium text-foreground">{t(`actions.${row.original.action}`)}</span>,
        size: 200,
      },
      {
        accessorKey: "entity",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.entity")} column={column} />,
        cell: ({ row }) => <Badge variant="secondary">{t(`entities.${row.original.entity}`)}</Badge>,
        size: 140,
      },
      {
        accessorKey: "details",
        header: t("columns.details"),
        enableSorting: false,
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.details}</span>,
        size: 260,
      },
    ],
    [t, locale],
  );

  return (
    <DataTable
      columns={columns}
      data={visible}
      search={{ placeholder: t("searchPlaceholder"), getText: (entry) => `${entry.actorName} ${entry.details}` }}
      filters={
        <Select value={entity} onValueChange={setEntity}>
          <SelectTrigger className="h-9 w-44"><SelectValue placeholder={t("filters.entity")} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tCommon("all")}</SelectItem>
            {auditEntities.map((item) => <SelectItem key={item} value={item}>{t(`entities.${item}`)}</SelectItem>)}
          </SelectContent>
        </Select>
      }
      empty={<EmptyState icon={ScrollText} title={t("empty")} />}
    />
  );
}
