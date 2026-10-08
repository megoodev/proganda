"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCompactNumber } from "@/lib/format";
import { setBloggerStatus } from "@/features/bloggers/actions/set-blogger-status";
import type { Blogger, ContractStatus } from "@/features/bloggers/schemas";

export function BloggersTable({ initialBloggers }: { initialBloggers: Blogger[] }) {
  const t = useTranslations("admin.bloggers");
  const tPlatforms = useTranslations("admin.platforms");
  const locale = useLocale();
  const [rows, setRows] = useState(initialBloggers);

  const setStatus = async (id: string, status: ContractStatus) => {
    const result = await setBloggerStatus({ id, status });
    if (result.ok) setRows((prev) => prev.map((row) => (row.id === id ? result.data : row)));
  };

  const columns = useMemo<AdminColumnDef<Blogger>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.name")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.name} subtitle={row.original.niche} />,
        size: 220,
      },
      {
        id: "platforms",
        header: t("columns.platforms"),
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.platforms.map((platform) => <Badge key={platform} variant="secondary">{tPlatforms(platform)}</Badge>)}
          </div>
        ),
        size: 220,
      },
      {
        accessorKey: "followers",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.followers")} column={column} />,
        cell: ({ row }) => <span className="tabular-nums">{formatCompactNumber(row.original.followers, locale)}</span>,
        size: 130,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.contract")} column={column} />,
        cell: ({ row }) => (
          <StatusBadge label={t(`contract.${row.original.status}`)} tone={row.original.status === "contracted" ? "success" : "warning"} />
        ),
        size: 160,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) =>
          row.original.status === "pending" ? (
            <Button size="sm" onClick={() => setStatus(row.original.id, "contracted")}>{t("approve")}</Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setStatus(row.original.id, "pending")}>{t("revoke")}</Button>
          ),
        size: 160,
      },
    ],
    [t, tPlatforms, locale],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.name} ${item.niche}` }}
      empty={<EmptyState icon={Users} title={t("empty")} />}
    />
  );
}
