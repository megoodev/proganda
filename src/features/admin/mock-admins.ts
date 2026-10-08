import type { AdminRole } from "./roles";

export const mockAdmins = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@proganda.studio",
    adminRole: "SUPER_ADMIN" as AdminRole,
    active: true,
  },
  {
    id: "2",
    name: "Campaign Manager",
    email: "campaign@proganda.studio",
    adminRole: "CAMPAIGN_MANAGER" as AdminRole,
    active: true,
  },
  {
    id: "3",
    name: "Creator Manager",
    email: "creator@proganda.studio",
    adminRole: "CREATOR_MANAGER" as AdminRole,
    active: true,
  },
];
