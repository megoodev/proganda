"use client";

import { useMemo } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { RowActions } from "@/components/shared/row-actions";
import { adminRoles, type AdminRole } from "@/features/admin/roles";
import type { AdminUser } from "@/features/admin/schemas";
import { useCrudList } from "@/features/admin/use-crud-list";
import { AdminFormDialog } from "./admin-form-dialog";

export function AdminsTable({ initialAdmins }: { initialAdmins: AdminUser[] }) {
  const t = useTranslations("admin.admins");
  const tRoles = useTranslations("admin.roles");
  const { rows, setRows, editing, setEditing, save } = useCrudList(initialAdmins);

  // Phase C: Server Actions (update-admin-role.ts, set-admin-active.ts) + audit log entries.
  const patch = (id: string, values: Partial<AdminUser>) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...values } : row)));

  // The last active super admin can't be demoted or deactivated
  const activeSupers = rows.filter((row) => row.role === "super_admin" && row.active).length;
  const isLocked = (row: AdminUser) => row.role === "super_admin" && row.active && activeSupers === 1;

  const columns = useMemo<AdminColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.name")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.name} subtitle={row.original.email} />,
        size: 260,
      },
      {
        accessorKey: "role",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.role")} column={column} />,
        cell: ({ row }) => (
          <Select value={row.original.role} disabled={isLocked(row.original)} onValueChange={(value) => patch(row.original.id, { role: value as AdminRole })}>
            <SelectTrigger className="h-8 w-44"><SelectValue /></SelectTrigger>
            <SelectContent>{adminRoles.map((role) => <SelectItem key={role} value={role}>{tRoles(role)}</SelectItem>)}</SelectContent>
          </Select>
        ),
        size: 210,
      },
      {
        accessorKey: "active",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.active")} column={column} />,
        cell: ({ row }) => (
          <Switch
            checked={row.original.active}
            disabled={isLocked(row.original)}
            onCheckedChange={(value) => patch(row.original.id, { active: value })}
            aria-label={t("columns.active")}
          />
        ),
        size: 110,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => <RowActions onEdit={() => setEditing(row.original)} />,
        size: 60,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, tRoles, activeSupers, setEditing],
  );

  return (
    <>
      <p className="mb-3 text-xs text-muted-foreground">{t("lastSuperHint")}</p>
      <DataTable
        columns={columns}
        data={rows}
        search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.name} ${item.email}` }}
        actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />{t("new")}</Button>}
        empty={<EmptyState icon={ShieldCheck} title={t("empty")} />}
      />
      {editing && (
        <AdminFormDialog key={editing === "new" ? "new" : editing.id} admin={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSave={save} />
      )}
    </>
  );
}
