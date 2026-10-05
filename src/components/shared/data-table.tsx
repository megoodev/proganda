"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  useTable,
  type ColumnDef,
  type ExpandedState,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { Loader2Icon, SearchIcon, SearchXIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@/components/reui/data-grid/data-grid";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import { mergeDataGridI18n } from "@/components/reui/data-grid/data-grid-i18n";

// TanStack Table v9: the feature set is the first generic. Use this type for every column array.
export type AdminColumnDef<TData extends RowData> = ColumnDef<DataGridFeatures, TData>;

type Props<TData extends RowData> = {
  columns: AdminColumnDef<TData>[];
  data: TData[];
  /** Shown when `data` is empty */
  empty?: ReactNode;
  pageSize?: number;
  loading?: boolean;
  /** Text search over the rows, handled here so every table gets the same toolbar */
  search?: { placeholder: string; getText: (row: TData) => string };
  /** Extra controls next to the search box (selects, filters) */
  filters?: ReactNode;
  /** Primary actions on the opposite side (e.g. the "Add" button) */
  actions?: ReactNode;
  /** Only for hierarchical data (tree rows) */
  getSubRows?: (row: TData) => TData[] | undefined;
  getRowId?: (row: TData, index: number) => string;
};

const MIN_PAGE_SIZE = 10;

export function DataTable<TData extends RowData>({
  columns,
  data,
  empty,
  pageSize = MIN_PAGE_SIZE,
  loading = false,
  search,
  filters,
  actions,
  getSubRows,
  getRowId,
}: Props<TData>) {
  const t = useTranslations("admin.common");
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const dataGridI18n = useMemo(() => mergeDataGridI18n({
    labels: {
      rowsPerPage: t("rowsPerPage"),
      paginationInfo: ({ from, to, count }) => t("paginationInfo").replace("{from}", String(from)).replace("{to}", String(to)).replace("{count}", String(count)),
      previousPage: t("previous"),
      nextPage: t("next"),
      goToPage: (page) => `${t("pageOf").replace("{current}", String(page)).replace("{total}", "")}`,
      paginationEllipsis: "...",
    }
  }), [t]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!search || !needle) return data;
    return data.filter((row) => search.getText(row).toLowerCase().includes(needle));
  }, [data, query, search]);

  // Derived, so the page never points past the end after filtering or deleting
  const pageCount = Math.max(1, Math.ceil(rows.length / pagination.pageSize));
  const pageIndex = Math.min(pagination.pageIndex, pageCount - 1);

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: rows,
    pageCount,
    getRowId:
      getRowId ?? ((row: TData, index: number) => (row as unknown as { id?: string }).id ?? String(index)),
    getSubRows,
    ...(getSubRows ? { paginateExpandedRows: false } : {}),
    state: { pagination: { pageIndex, pageSize: pagination.pageSize }, sorting, expanded },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
  });

  if (loading) {
    return (
      <Card className="flex items-center justify-center border-border/60 p-12 text-muted-foreground shadow-xs">
        <div className="flex flex-col items-center gap-3">
          <Loader2Icon className="size-6 animate-spin text-primary" />
          <span className="text-xs font-medium">{t("loading")}</span>
        </div>
      </Card>
    );
  }

  const hasToolbar = !!search || !!filters || !!actions;

  return (
    <div className="space-y-4">
      {hasToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {search && data.length > 0 && (
              <div className="relative w-full sm:w-72">
                <SearchIcon className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={search.placeholder}
                  aria-label={t("search")}
                  className="h-9 ps-9"
                />
              </div>
            )}
            {filters}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {data.length === 0 ? (
        empty
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 py-14 text-center">
          <SearchXIcon className="mb-3 size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("noResults")}</p>
        </div>
      ) : (
        <DataGrid table={table} recordCount={rows.length} i18n={dataGridI18n}>
          <div className="w-full space-y-3">
            <Card className="overflow-hidden border-border/60 bg-card p-0 shadow-xs">
              <DataGridContainer>
                <DataGridScrollArea>
                  <DataGridTable />
                </DataGridScrollArea>
              </DataGridContainer>
            </Card>

            {/* Keyed on the smallest page size so the page-size picker stays reachable */}
            {rows.length > MIN_PAGE_SIZE && <DataGridPagination />}
          </div>
        </DataGrid>
      )}
    </div>
  );
}
