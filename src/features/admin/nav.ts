import {
  Briefcase,
  Building2,
  FileSignature,
  Inbox,
  Layers,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  ScrollText,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { can } from "./permissions";
import { adminRoles, type AdminRole } from "./roles";

export type NavItem = {
  key: string;
  href: string;
  icon: LucideIcon;
  ready: boolean;
  roles: readonly AdminRole[];
};

export const navGroups: { key: string; items: NavItem[] }[] = [
  {
    key: "overview",
    items: [{ key: "overview", href: "/admin", icon: LayoutDashboard, ready: true, roles: adminRoles }],
  },
  {
    key: "requests",
    items: [{ key: "requests", href: "/admin/requests", icon: Inbox, ready: true, roles: can.requests }],
  },
  {
    key: "content",
    items: [
      { key: "portfolio", href: "/admin/portfolio", icon: Briefcase, ready: true, roles: can.portfolio },
      { key: "services", href: "/admin/services", icon: Layers, ready: true, roles: can.services },
      { key: "creators", href: "/admin/creators", icon: UserRound, ready: true, roles: can.creators },
      { key: "ads", href: "/admin/ads", icon: Megaphone, ready: true, roles: can.ads },
    ],
  },
  {
    key: "people",
    items: [
      { key: "bloggers", href: "/admin/bloggers", icon: Users, ready: true, roles: can.bloggers },
      { key: "brands", href: "/admin/brands", icon: Building2, ready: true, roles: can.brands },
      { key: "contracts", href: "/admin/contracts", icon: FileSignature, ready: true, roles: can.contracts },
      { key: "admins", href: "/admin/admins", icon: ShieldCheck, ready: true, roles: can.admins },
    ],
  },
  {
    key: "chat",
    items: [{ key: "chat", href: "/admin/chat", icon: MessageSquare, ready: true, roles: can.chat }],
  },
  {
    key: "system",
    items: [
      { key: "auditLog", href: "/admin/audit-log", icon: ScrollText, ready: true, roles: can.audit },
      { key: "settings", href: "/admin/settings", icon: Settings, ready: true, roles: can.settings },
    ],
  },
];

export function canAccess(item: NavItem, role: AdminRole | null) {
  return !!role && item.roles.includes(role);
}
