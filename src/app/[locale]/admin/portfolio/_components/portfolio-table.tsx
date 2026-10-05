"use client";

import { useMemo } from "react";
import { Briefcase, Pencil } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import { DataTable, type AdminColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCompactNumber } from "@/lib/format";
import type { CaseStudy } from "@/features/portfolio/schemas";

const totalViews = (item: CaseStudy) => item.metrics.reduce((sum, metric) => sum + metric.views, 0);

export function PortfolioTable({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const t = useTranslations("admin.portfolio");
  const tPlatforms = useTranslations("admin.platforms");
  const locale = useLocale();

  const columns = useMemo<AdminColumnDef<CaseStudy>[]>(
    () => [
      {
        accessorKey: "brand",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.brand")} column={column} />,
        cell: ({ row }) => <span className="font-medium text-foreground">{row.original.brand}</span>,
        size: 170,
      },
      {
        accessorKey: "title",
        header: ({ column }) => <DataGridColumnHeader title={t("columns.title")} column={column} />,
        size: 220,
      },
      {
        id: "views",
        accessorFn: totalViews,
        header: ({ column }) => <DataGridColumnHeader title={t("columns.views")} column={column} />,
        cell: ({ row }) => <span className="tabular-nums">{formatCompactNumber(totalViews(row.original), locale)}</span>,
        size: 120,
      },
      {
        id: "platforms",
        header: t("columns.platforms"),
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.metrics.map((metric) => <Badge key={metric.platform} variant="secondary">{tPlatforms(metric.platform)}</Badge>)}
          </div>
        ),
        size: 220,
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
        cell: ({ row }) => (
          <Button asChild variant="ghost" size="icon" className="size-8 text-muted-foreground">
            <Link href={`/admin/portfolio/${row.original.id}/edit`} aria-label={t("edit")}>
              <Pencil className="size-4" />
            </Link>
          </Button>
        ),
        size: 60,
      },
    ],
    [t, tPlatforms, locale],
  );

  return (
    <DataTable
      columns={columns}
      data={caseStudies}
      search={{ placeholder: t("searchPlaceholder"), getText: (item) => `${item.brand} ${item.title}` }}
      empty={<EmptyState icon={Briefcase} title={t("empty.title")} description={t("empty.description")} />}
    />
  );
}
