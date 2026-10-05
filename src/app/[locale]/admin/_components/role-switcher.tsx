"use client";

import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminRole } from "@/features/admin/admin-role-context";
import { adminRoles, type AdminRole } from "@/features/admin/roles";

// Preview tool for the manager (phase A). Remove in phase C.
export function RoleSwitcher() {
  const t = useTranslations("admin.roles");
  const { role, setRole } = useAdminRole();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden text-muted-foreground sm:inline">{t("viewingAs")}</span>
      <Select value={role} onValueChange={(value) => setRole(value as AdminRole)}>
        <SelectTrigger className="h-8 w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {adminRoles.map((item) => (
            <SelectItem key={item} value={item}>
              {t(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
