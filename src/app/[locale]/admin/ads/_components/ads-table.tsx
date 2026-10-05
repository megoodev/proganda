"use client";

import { useMemo } from "react";
import { Megaphone, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { RowActions } from "@/components/shared/row-actions";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate } from "@/lib/format";
import { useCrudList } from "@/features/admin/use-crud-list";
import { adStatusTone, getAdStatus } from "@/features/ads/ad-status";
import type { Ad } from "@/features/ads/schemas";
import { AdFormDialog } from "./ad-form-dialog";

export function AdsTable({ initialAds }: { initialAds: Ad[] }) {
  const t = useTranslations("admin.ads");
  const locale = useLocale();
  const { rows, editing, setEditing, deleting, setDeleting, save, confirmDelete } = useCrudList(initialAds);

  const columns = useMemo<AdminColumnDef<Ad>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.title")} column={column} />,
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.original.title}</p>
            {row.original.brandName && <p className="truncate text-xs text-muted-foreground">{row.original.brandName}</p>}
          </div>
        ),
        size: 260,
      },
      {
        accessorKey: "placement",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.placement")} column={column} />,
        cell: ({ row }) => <Badge variant="secondary">{t(`placements.${row.original.placement}`)}</Badge>,
        size: 150,
      },
      {
        accessorKey: "source",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.source")} column={column} />,
        cell: ({ row }) => t(`sources.${row.original.source}`),
        size: 110,
      },
      {
        accessorKey: "startsAt",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.period")} column={column} />,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-muted-foreground">
            {formatDate(row.original.startsAt, locale)} – {formatDate(row.original.endsAt, locale)}
          </span>
        ),
        size: 250,
      },
      {
        id: "status",
        header: t("columns.status"),
        enableSorting: false,
        cell: ({ row }) => {
          const status = getAdStatus(row.original);
          return <StatusBadge label={t(`statuses.${status}`)} tone={adStatusTone[status]} />;
        },
        size: 130,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => <RowActions onEdit={() => setEditing(row.original)} onDelete={() => setDeleting(row.original)} />,
        size: 60,
      },
    ],
    [t, locale, setEditing, setDeleting],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.title} ${item.brandName ?? ""}` }}
        actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />{t("new")}</Button>}
        empty={<EmptyState icon={Megaphone} title={t("empty.title")} description={t("empty.description")} />}
      />
      {editing && <AdFormDialog key={editing === "new" ? "new" : editing.id} ad={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSave={save} />}
      <ConfirmDeleteDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)} onConfirm={confirmDelete} itemName={deleting?.title} />
    </>
  );
}
