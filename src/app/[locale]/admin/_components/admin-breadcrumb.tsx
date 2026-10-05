"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { navGroups } from "@/features/admin/nav";

export function AdminBreadcrumb() {
  const t = useTranslations("admin.nav");
  const pathname = usePathname();

  const current = navGroups
    .flatMap((group) => group.items)
    .filter((item) => (item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href)))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{t("brand")}</span>
      {current && current.href !== "/admin" && (
        <>
          <ChevronRight className="size-3.5 text-muted-foreground rtl:rotate-180" />
          <span className="font-medium text-foreground">{t(`items.${current.key}`)}</span>
        </>
      )}
    </nav>
  );
}
