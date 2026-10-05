"use client";

import { useMemo } from "react";
import { Layers, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { RowActions } from "@/components/shared/row-actions";
import { StatusBadge } from "@/components/shared/status-badge";
import { useCrudList } from "@/features/admin/use-crud-list";
import type { Service } from "@/features/services/schemas";
import { ServiceFormDialog } from "./service-form-dialog";

export function ServicesTable({ initialServices }: { initialServices: Service[] }) {
  const t = useTranslations("admin.services");
  const { rows, editing, setEditing, deleting, setDeleting, save, confirmDelete } = useCrudList(initialServices);

  const columns = useMemo<AdminColumnDef<Service>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.title")} column={column} />,
        cell: ({ row }) => <span className="font-medium text-foreground">{row.original.title}</span>,
        size: 200,
      },
      {
        accessorKey: "description",
        header: t("columns.description"),
        enableSorting: false,
        cell: ({ row }) => <span className="line-clamp-1 text-muted-foreground">{row.original.description}</span>,
        size: 380,
      },
      {
        accessorKey: "published",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.status")} column={column} />,
        cell: ({ row }) => (
          <StatusBadge label={row.original.published ? t("status.published") : t("status.draft")} tone={row.original.published ? "success" : "neutral"} />
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
        search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.title} ${item.description}` }}
        actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />{t("new")}</Button>}
        empty={<EmptyState icon={Layers} title={t("empty.title")} description={t("empty.description")} />}
      />
      {editing && (
        <ServiceFormDialog key={editing === "new" ? "new" : editing.id} service={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSave={save} />
      )}
      <ConfirmDeleteDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)} onConfirm={confirmDelete} itemName={deleting?.title} />
    </>
  );
}
