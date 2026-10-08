"use client";

import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AdminUser } from "@/features/admin/schemas";
import { requestStatuses, type RequestType } from "@/features/requests/schemas";

export type Filters = { type: string; status: string; assignee: string };
export const defaultFilters: Filters = { type: "all", status: "all", assignee: "all" };

type Props = {
  value: Filters;
  onChange: (value: Filters) => void;
  allowedTypes: readonly RequestType[];
  admins: AdminUser[];
};

export function RequestsFilters({ value, onChange, allowedTypes, admins }: Props) {
  const t = useTranslations("admin.requests");
  const tCommon = useTranslations("admin.common");
  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  return (
    <>
      <Select value={value.type} onValueChange={(type) => set({ type })}>
        <SelectTrigger className="h-9 w-36"><SelectValue placeholder={t("filters.type")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tCommon("all")}</SelectItem>
          {allowedTypes.map((type) => <SelectItem key={type} value={type}>{t(`types.${type}`)}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={value.status} onValueChange={(status) => set({ status })}>
        <SelectTrigger className="h-9 w-36"><SelectValue placeholder={t("filters.status")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tCommon("all")}</SelectItem>
          {requestStatuses.map((status) => <SelectItem key={status} value={status}>{t(`statuses.${status}`)}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={value.assignee} onValueChange={(assignee) => set({ assignee })}>
        <SelectTrigger className="h-9 w-40"><SelectValue placeholder={t("filters.assignee")} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tCommon("all")}</SelectItem>
          <SelectItem value="unassigned">{t("unassigned")}</SelectItem>
          {admins.map((admin) => <SelectItem key={admin.id} value={admin.id}>{admin.name}</SelectItem>)}
        </SelectContent>
      </Select>
    </>
  );
}
