"use client";

import { ChevronRight, LayoutDashboard, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { canAccess, navGroups } from "@/features/admin/nav";
import { useAdminRole } from "@/features/admin/admin-role-context";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const t = useTranslations("admin.nav");
  const tRoles = useTranslations("admin.roles");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const { role } = useAdminRole();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <Sidebar
      side={locale === "ar" ? "right" : "left"}
      collapsible="icon"
      className="border-none bg-transparent p-2 md:p-3 transition-all duration-300 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:w-18"
    >
      {/* Floating Inner Card Container */}
      <div className="flex h-full w-full flex-col rounded-2xl border border-border/50 bg-card/90 text-card-foreground backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden transition-all duration-300">
        
        {/* Header: Brand & App Title */}
        <SidebarHeader className="p-3 group-data-[collapsible=icon]:p-1.5">
          <Link
            href="/admin"
            className="group flex items-center gap-3 px-2 py-1.5 transition-opacity hover:opacity-90 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
              <LayoutDashboard className="size-4.5" />
            </div>
            <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden leading-tight">
              <span className="truncate text-sm font-bold tracking-tight text-foreground">
                {tCommon("brandFirstPart")}
                <span className="text-primary">{tCommon("brandSecondPart")}</span>
              </span>
              <span className="truncate text-[11px] font-medium text-muted-foreground">
                {t("brand")}
              </span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarSeparator className="mx-3 my-1 bg-border/40 group-data-[collapsible=icon]:mx-2" />

        {/* Content: Navigation Groups & Items */}
        <SidebarContent className="px-2 py-1 scrollbar-none group-data-[collapsible=icon]:px-1">
          {navGroups.map((group, groupIdx) => {
            const items = group.items.filter((item) => canAccess(item, role));
            if (items.length === 0) return null;

            return (
              <div key={group.key}>
                {groupIdx > 0 && (
                  <SidebarSeparator className="mx-2 my-2 bg-border/30 group-data-[collapsible=icon]:mx-1" />
                )}

                <SidebarGroup className="py-1 group-data-[collapsible=icon]:p-0">
                  <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 group-data-[collapsible=icon]:hidden px-2 mb-1">
                    {t(`groups.${group.key}`)}
                  </SidebarGroupLabel>

                  <SidebarGroupContent>
                    <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
                      {items.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                          <SidebarMenuItem key={item.key} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                            {item.ready ? (
                              <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={t(`items.${item.key}`)}
                                className={cn(
                                  "group/btn relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:w-full",
                                  active
                                    ? "bg-primary/10 text-primary font-semibold shadow-xs hover:bg-primary/15"
                                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                )}
                              >
                                <Link href={item.href} className="w-full flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                                  {/* Active Accent Pill */}
                                  {active && (
                                    <span className="absolute left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary ltr:left-1 rtl:right-1 rtl:left-auto group-data-[collapsible=icon]:hidden" />
                                  )}

                                  {/* Item Icon */}
                                  <Icon
                                    className={cn(
                                      "size-4.5 shrink-0 transition-all duration-200 group-hover/btn:scale-110 group-data-[collapsible=icon]:mx-auto",
                                      active ? "text-primary" : "text-muted-foreground group-hover/btn:text-foreground"
                                    )}
                                  />

                                  {/* Title */}
                                  <span className="truncate flex-1 group-data-[collapsible=icon]:hidden">
                                    {t(`items.${item.key}`)}
                                  </span>

                                  {/* Hover Arrow Effect */}
                                  <ChevronRight
                                    className={cn(
                                      "size-4 shrink-0 opacity-0 -translate-x-2 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 group-data-[collapsible=icon]:hidden rtl:rotate-180 rtl:group-hover/btn:translate-x-0",
                                      active ? "text-primary opacity-100 translate-x-0" : "text-muted-foreground"
                                    )}
                                  />
                                </Link>
                              </SidebarMenuButton>
                            ) : (
                              <SidebarMenuButton
                                disabled
                                aria-disabled
                                tooltip={`${t(`items.${item.key}`)} (${t("soon")})`}
                                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm opacity-50 cursor-not-allowed group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:w-full"
                              >
                                <Icon className="size-4.5 shrink-0 text-muted-foreground group-data-[collapsible=icon]:mx-auto" />
                                <span className="truncate flex-1 group-data-[collapsible=icon]:hidden">
                                  {t(`items.${item.key}`)}
                                </span>
                                <SidebarMenuBadge className="bg-muted/80 text-[10px] font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
                                  {t("soon")}
                                </SidebarMenuBadge>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </div>
            );
          })}
        </SidebarContent>

        {/* Footer: User Role Section */}
        <SidebarFooter className="p-3 mt-auto group-data-[collapsible=icon]:p-1.5">
          <div className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 p-2.5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:w-full">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary group-data-[collapsible=icon]:mx-auto">
              <ShieldCheck className="size-4" />
            </div>
            <div className="min-w-0 leading-tight group-data-[collapsible=icon]:hidden">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {t("yourRole")}
              </p>
              <p className="truncate text-xs font-bold text-foreground">
                {role ? tRoles(role) : "—"}
              </p>
            </div>
          </div>
        </SidebarFooter>

      </div>

      <SidebarRail />
    </Sidebar>
  );
}