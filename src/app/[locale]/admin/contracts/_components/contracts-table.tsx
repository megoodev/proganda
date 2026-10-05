"use client";

import { useMemo, useState } from "react";
import { FileSignature } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { PersonCell } from "@/components/shared/person-cell";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate } from "@/lib/format";
import type { ContractRequest } from "@/features/contracts/schemas";
import { contractTone } from "@/features/contracts/status-tone";
import { ContractReviewDialog } from "./contract-review-dialog";

export function ContractsTable({ initialContracts }: { initialContracts: ContractRequest[] }) {
  const t = useTranslations("admin.contracts");
  const locale = useLocale();
  const [rows, setRows] = useState(initialContracts);
  const [reviewing, setReviewing] = useState<ContractRequest | null>(null);

  const columns = useMemo<AdminColumnDef<ContractRequest>[]>(
    () => [
      {
        accessorKey: "party",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.party")} column={column} />,
        cell: ({ row }) => <PersonCell name={row.original.party} subtitle={row.original.notes || undefined} />,
        size: 260,
      },
      {
        accessorKey: "partyType",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.type")} column={column} />,
        cell: ({ row }) => <Badge variant="secondary">{t(`types.${row.original.partyType}`)}</Badge>,
        size: 120,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.status")} column={column} />,
        cell: ({ row }) => <StatusBadge label={t(`statuses.${row.original.status}`)} tone={contractTone[row.original.status]} />,
        size: 170,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.date")} column={column} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(row.original.createdAt, locale)}</span>,
        size: 130,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => <Button size="sm" variant="outline" onClick={() => setReviewing(row.original)}>{t("review")}</Button>,
        size: 110,
      },
    ],
    [t, locale],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        search={{ placeholder: t("searchPlaceholder"), getText: (item) => item.party }}
        empty={<EmptyState icon={FileSignature} title={t("empty")} />}
      />
      {reviewing && (
        <ContractReviewDialog
          key={reviewing.id}
          contract={reviewing}
          onClose={() => setReviewing(null)}
          // Phase C: Server Action (review-contract.ts) that also updates the user's status + audit log
          onSave={(values) => {
            setRows((prev) => prev.map((row) => (row.id === reviewing.id ? { ...row, ...values } : row)));
            setReviewing(null);
          }}
        />
      )}
    </>
  );
}
