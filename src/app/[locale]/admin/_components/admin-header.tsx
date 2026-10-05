"use client";

import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AdminBreadcrumb } from "./admin-breadcrumb";
import { RoleSwitcher } from "./role-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavUser } from "@/components/shared/nav-user";
import { LanguageSwitcher } from "@/components/language-switcher";

const showRolePreview = process.env.NEXT_PUBLIC_ADMIN_ROLE_PREVIEW === "true";

export function AdminHeader({
  locale,
  label,
}: {
  locale: "en" | "ar";
  label: string;
}) {
  return (
    <header className="sticky top-0 z-20 w-full px-4 pt-4 transition-all ">
      <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/75 px-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-border/80 dark:bg-card/60">
        <div className="flex items-center gap-3 min-w-0">
          <SidebarTrigger className="h-9 w-9 rounded-xl border border-border/40 bg-background/60 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-xs" />

          <Separator orientation="vertical" className="h-10 bg-border/60" />

          <div className="group relative flex items-center gap-2 overflow-hidden py-1">
            <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <AdminBreadcrumb />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showRolePreview && (
            <div className="hidden sm:block">
              <RoleSwitcher />
            </div>
          )}


          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9 rounded-xl border-border/40 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute top-2.5 end-2.5 size-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
          </Button>

          <ThemeToggle />
                  <Separator
            orientation="vertical"
            className="h-10 bg-border/60 mx-1 hidden sm:block"
          />

          <LanguageSwitcher locale={locale} label={label} />

          <Separator
            orientation="vertical"
            className="h-10 bg-border/60 mx-1 hidden sm:block"
          />

          <NavUser />
        </div>
      </div>
    </header>
  );
}
