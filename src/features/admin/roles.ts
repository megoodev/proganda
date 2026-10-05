export const adminRoles = [
  "super_admin",
  "campaign_manager",
  "creator_manager",
  "hr",
  "ads_manager",
] as const;

export type AdminRole = (typeof adminRoles)[number];
