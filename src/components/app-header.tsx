"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { navLinks } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { BellIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const activeItem = navLinks.find((item) => item.isActive);

export function AppHeader() {
  const t = useTranslations("dashboard");
  return (
    <header
      className={cn(
        "px-4 mb-6 flex items-center justify-between gap-2 md:px-2",
      )}
    >
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="me-2 h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <AppBreadcrumbs
          page={
            activeItem ? { ...activeItem, title: t("dashboard") } : activeItem
          }
        />
      </div>
      <div className="flex items-center gap-3">
        <Button aria-label={t("notifications")} size="icon" variant="ghost">
          <BellIcon />
        </Button>
        <Separator
          className="h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <NavUser />
      </div>
    </header>
  );
}
