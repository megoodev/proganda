"use client";

import { useState } from "react";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  Building2,
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Loader2,
  Bell,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/creators", label: "Creators", icon: Sparkles },
  { href: "/admin/brands", label: "Brands", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Wallet },
  { href: "/admin/inquiries", label: "Inquiries", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/audit", label: "Audit log", icon: Shield, adminOnly: true },
];

export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: string; image?: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.role === "admin";

  const [isSignOutPending, setIsSignOutPending] = useState(false);

  async function handleSignOut() {
    try {
      setIsSignOutPending(true);
      await authClient.signOut();
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSignOutPending(false);
    }
  }

  const filteredNav = NAV.filter((item) => !item.adminOnly || isAdmin);

  const activeNav = filteredNav.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href)
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#09090b] text-white dark">
        {/* Sidebar matching App Shell 4 (Collapsible Icon & Variant Inset) */}
        <Sidebar collapsible="icon" variant="inset" className="border-r border-white/10 bg-[#111114]">
          <SidebarHeader className="h-14 justify-center border-b border-white/10 px-4">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center justify-between">
                <SidebarMenuButton asChild className="hover:bg-transparent">
                  <Link href="/admin" className="flex items-center gap-2 text-lg font-black tracking-tight">
                    <span className="truncate">ProGanda <span className="text-[#3AA7FD]">CMS</span></span>
                  </Link>
                </SidebarMenuButton>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-[10px] uppercase tracking-widest text-white/40 hover:bg-transparent hover:text-white group-data-[collapsible=icon]:hidden"
                >
                  <Link href="/" className="flex items-center gap-1">
                    Site
                    <ExternalLink className="size-3" />
                  </Link>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Navigation
              </SidebarGroupLabel>
              <SidebarMenu className="mt-2">
                {filteredNav.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.label}
                        className={cn(
                          "w-full justify-start gap-2.5 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                          active
                            ? "bg-[#3AA7FD] text-black hover:bg-[#3AA7FD]/90 hover:text-black"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Link href={item.href}>
                          <Icon className="size-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-white/10 p-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="w-full justify-start gap-3 px-2 text-left hover:bg-white/5"
                    >
                      <Avatar className="size-8 border border-white/10">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-white/10 text-xs font-bold text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 text-left group-data-[collapsible=icon]:hidden">
                        <span className="truncate text-sm font-semibold text-white">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-white/40">
                          {user.email}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    side="right"
                    className="w-56 border-white/10 bg-[#18181b] text-white"
                  >
                    <DropdownMenuItem className="flex items-center justify-start gap-2">
                      <DropdownMenuLabel className="flex items-center gap-3 p-0">
                        <Avatar className="size-9 border border-white/10">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-white/10 text-xs font-bold text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                          <p className="truncate text-xs text-white/40">{user.email}</p>
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className="border-[#3AA7FD]/30 bg-[#3AA7FD]/10 text-[9px] font-bold uppercase tracking-widest text-[#3AA7FD]"
                            >
                              {user.role}
                            </Badge>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/10" />

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        disabled={isSignOutPending}
                        onClick={handleSignOut}
                        className="gap-2 text-xs font-bold text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                      >
                        {isSignOutPending ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <LogOut className="size-3.5" />
                        )}
                        {isSignOutPending ? "Signing out..." : "Sign out"}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Inset Shell Container */}
        <SidebarInset className="flex flex-col bg-[#09090b] p-4 md:p-6">
          {/* Header with trigger, breadcrumb, and user controls */}
          <header className="mb-6 flex items-center justify-between gap-2 px-2 md:px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <Separator
                className="mr-2 h-4 bg-white/10 data-[orientation=vertical]:self-center"
                orientation="vertical"
              />
              {activeNav && (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="flex items-center gap-2 text-sm font-semibold text-white">
                        <activeNav.icon className="size-4 text-[#3AA7FD]" />
                        {activeNav.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                aria-label="Notifications"
                size="icon"
                variant="ghost"
                className="text-white/60 hover:bg-white/5 hover:text-white"
              >
                <Bell className="size-4" />
              </Button>
            </div>
          </header>

          {/* Main Workspace Area */}
          <main className="flex flex-1 flex-col gap-4 min-w-0 px-2 md:px-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}