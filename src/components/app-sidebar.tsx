"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import {
  footerNavLinks,
  navGroups,
  type SidebarNavItem,
} from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function AppSidebar() {
  const t = useTranslations("dashboard");
  const labels: Record<string, string> = {
    Overview: t("overview"),
    Dashboard: t("dashboard"),
    Sales: t("sales"),
    Store: t("store"),
    Orders: t("orders"),
    "All orders": t("allOrders"),
    Unfulfilled: t("unfulfilled"),
    Returns: t("returns"),
    Products: t("products"),
    Catalog: t("catalog"),
    Inventory: t("inventory"),
    Collections: t("collections"),
    Customers: t("customers"),
    Marketing: t("marketing"),
    Settings: t("settings"),
    "Store settings": t("storeSettings"),
    "Store profile": t("storeProfile"),
    "Shipping & delivery": t("shippingDelivery"),
    Payments: t("payments"),
    Staff: t("staff"),
    Apps: t("apps"),
    "Seller help": t("sellerHelp"),
    "Platform status": t("platformStatus"),
  };
  const translateItem = (item: SidebarNavItem): SidebarNavItem => ({
    ...item,
    title: labels[item.title] ?? item.title,
    subItems: item.subItems?.map(translateItem),
  });
  const translatedGroups = navGroups.map((group) => ({
    ...group,
    label: labels[group.label] ?? group.label,
    items: group.items.map(translateItem),
  }));
  const translatedFooterLinks = footerNavLinks.map(translateItem);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="h-14 justify-center">
        <SidebarMenuButton asChild>
          <Link
            href="/"
            className="group space-0 shrink-0 text-xl font-black tracking-tighter transition-transform duration-200 active:scale-95"
          >
            <span className="text-foreground">Pro</span>
            <span className="text-primary">Ganda</span>
            <span className="text-destructive inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
              .
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              tooltip={t("addProduct")}
            >
              <PlusIcon />
              <span>{t("newProject")}</span>
            </SidebarMenuButton>
            <Button
              aria-label={t("searchStore")}
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              size="icon"
              variant="outline"
            >
              <SearchIcon />
              <span className="sr-only">{t("searchStore")}</span>
            </Button>
          </SidebarMenuItem>
        </SidebarGroup>
        {translatedGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <LatestChange />
        <SidebarMenu className="mt-2">
          {translatedFooterLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                isActive={item.isActive}
                size="sm"
              >
                <a href={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
