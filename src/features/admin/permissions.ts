import type { AdminRole } from "./roles";

const roles = (...list: AdminRole[]): readonly AdminRole[] => list;

// Single source of truth for "who can do what". Used by every Server Action and query.
// (The dashboard sidebar in features/admin/nav.ts mirrors the read permissions.)
export const can = {
  requests: roles("super_admin", "campaign_manager", "hr", "ads_manager"),
  requestsDelete: roles("super_admin"),
  portfolio: roles("super_admin", "campaign_manager"),
  services: roles("super_admin", "campaign_manager"),
  creators: roles("super_admin", "creator_manager"),
  ads: roles("super_admin", "ads_manager"),
  bloggers: roles("super_admin", "creator_manager"),
  brands: roles("super_admin", "campaign_manager"),
  contracts: roles("super_admin", "creator_manager", "campaign_manager"),
  chat: roles("super_admin", "creator_manager"),
  admins: roles("super_admin"),
  audit: roles("super_admin"),
  settings: roles("super_admin"),
};

// A contract request is reviewed by the manager of the party's side.
export const contractRolesByParty: Record<"blogger" | "brand", readonly AdminRole[]> = {
  blogger: roles("super_admin", "creator_manager"),
  brand: roles("super_admin", "campaign_manager"),
};
