export const PUBLIC_ROLES = ["brand", "blogger", "creator"] as const;
export const STAFF_ROLES = ["admin", "team"] as const;
export const ADMIN_ONLY_ROLES = ["admin"] as const;

export type PublicRole = (typeof PUBLIC_ROLES)[number];
export type StaffRole = (typeof STAFF_ROLES)[number];
export type SessionRole = PublicRole | StaffRole;

export function isStaffRole(role: string | null | undefined): role is StaffRole {
  return STAFF_ROLES.includes(role as StaffRole);
}

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return role === "admin";
}

export function sanitizeSignupRole(role: unknown): PublicRole {
  if (role === "blogger" || role === "creator") return role;
  return "brand";
}
