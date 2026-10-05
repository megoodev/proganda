"use client";

import { useMemo } from "react";
import { Plus, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { RowActions } from "@/components/shared/row-actions";
import { StatusBadge } from "@/components/shared/status-badge";
import { useCrudList } from "@/features/admin/use-crud-list";
import type { ShowcaseCreator } from "@/features/creators/schemas";
import { CreatorFormDialog } from "./creator-form-dialog";

export function CreatorsTable({ initialCreators }: { initialCreators: ShowcaseCreator[] }) {
  const t = useTranslations("admin.creators");
  const { rows, editing, setEditing, deleting, setDeleting, save, confirmDelete } = useCrudList(initialCreators);

  const columns = useMemo<AdminColumnDef<ShowcaseCreator>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.name")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.name} subtitle={row.original.niche} image={row.original.image} />,
        size: 240,
      },
      {
        accessorKey: "reach",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.reach")} column={column} />,
        cell: ({ row }) => <span className="tabular-nums" dir="ltr">{row.original.reach}</span>,
        size: 120,
      },
      {
        accessorKey: "published",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.status")} column={column} />,
        cell: ({ row }) => (
          <StatusBadge label={row.original.published ? t("status.published") : t("status.hidden")} tone={row.original.published ? "success" : "neutral"} />
        ),
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
    [t, setEditing, setDeleting],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.name} ${item.niche}` }}
        actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />{t("new")}</Button>}
        empty={<EmptyState icon={UserRound} title={t("empty.title")} description={t("empty.description")} />}
      />
      {editing && (
        <CreatorFormDialog key={editing === "new" ? "new" : editing.id} creator={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSave={save} />
      )}
      <ConfirmDeleteDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)} onConfirm={confirmDelete} itemName={deleting?.name} />
    </>
  );
}
