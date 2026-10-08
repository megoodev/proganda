"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { StatusBadge } from "@/components/shared/status-badge";
import { setBrandStatus } from "@/features/brands/actions/set-brand-status";
import type { Brand, BrandStatus } from "@/features/brands/schemas";

export function BrandsTable({ initialBrands }: { initialBrands: Brand[] }) {
  const t = useTranslations("admin.brands");
  const [rows, setRows] = useState(initialBrands);

  // Phase C: Server Action (set-contract-status.ts) + audit log entry.
  const setStatus = (id: string, status: BrandStatus) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));

  const columns = useMemo<AdminColumnDef<Brand>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.name")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.name} subtitle={row.original.industry} />,
        size: 230,
      },
      {
        id: "contact",
        accessorFn: (row) => row.contactName,
        header: ({ column }) => <DataGridColumnHeader title={t("columns.contact")} column={column} />,
        cell: ({ row }) => (
          <div>
            <p className="text-foreground">{row.original.contactName}</p>
            <p dir="ltr" className="text-start text-xs text-muted-foreground">{row.original.contactPhone}</p>
          </div>
        ),
        size: 220,
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
    [t],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.name} ${item.industry} ${item.contactName}` }}
      empty={<EmptyState icon={Building2} title={t("empty")} />}
    />
  );
}
