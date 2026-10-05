import {
  Building2, FileSignature, Inbox, Layers, LayoutDashboard, Megaphone, MessagesSquare,
  Briefcase, ScrollText, Settings, ShieldCheck, UserRound, Users, type LucideIcon,
} from "lucide-react";
import type { AdminRole } from "./roles";

export type NavItem = {
  key: string; // translation key under admin.nav.items
  href: string;
  icon: LucideIcon;
  roles: AdminRole[] | "all";
  ready: boolean; // false = shown as "soon"
};
export type NavGroup = { key: string; items: NavItem[] };

const SUPER: AdminRole[] = ["super_admin"];

export const navGroups: NavGroup[] = [
  { key: "overview", items: [{ key: "overview", href: "/admin", icon: LayoutDashboard, roles: "all", ready: true }] },
  {
    key: "requests",
    items: [{ key: "requests", href: "/admin/requests", icon: Inbox, roles: ["super_admin", "campaign_manager", "hr", "ads_manager"], ready: true }],
  },
  {
    key: "content",
    items: [
      { key: "portfolio", href: "/admin/portfolio", icon: Briefcase, roles: ["super_admin", "campaign_manager"], ready: true },
      { key: "services", href: "/admin/services", icon: Layers, roles: ["super_admin", "campaign_manager"], ready: true },
      { key: "creators", href: "/admin/creators", icon: UserRound, roles: ["super_admin", "creator_manager"], ready: true },
      { key: "ads", href: "/admin/ads", icon: Megaphone, roles: ["super_admin", "ads_manager"], ready: true },
    ],
  },
  {
    key: "people",
    items: [
      { key: "bloggers", href: "/admin/bloggers", icon: Users, roles: ["super_admin", "creator_manager"], ready: true },
      { key: "brands", href: "/admin/brands", icon: Building2, roles: ["super_admin", "campaign_manager"], ready: true },
      { key: "contracts", href: "/admin/contracts", icon: FileSignature, roles: ["super_admin", "creator_manager", "campaign_manager"], ready: true },
      { key: "admins", href: "/admin/admins", icon: ShieldCheck, roles: SUPER, ready: true },
    ],
  },
  { key: "chat", items: [{ key: "chat", href: "/admin/chat", icon: MessagesSquare, roles: ["super_admin", "creator_manager"], ready: true }] },
  {
    key: "system",
    items: [
      { key: "auditLog", href: "/admin/audit-log", icon: ScrollText, roles: SUPER, ready: true },
      { key: "settings", href: "/admin/settings", icon: Settings, roles: SUPER, ready: true },
    ],
  },
];

export const canAccess = (item: NavItem, role: AdminRole) =>
  item.roles === "all" || item.roles.includes(role);
