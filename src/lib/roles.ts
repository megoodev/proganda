import type { UserRole } from "@/generated/prisma/enums";

export const USER_ROLES = ["USER", "BLOGGER", "BRAND", "ADMIN"] as const;
export const PUBLIC_ROLES = [
  "USER",
  "BLOGGER",
  "BRAND",
] as const satisfies readonly UserRole[];
export const STAFF_ROLES = ["ADMIN"] as const satisfies readonly UserRole[];
export const ADMIN_ONLY_ROLES = ["ADMIN"] as const;

export type PublicRole = (typeof PUBLIC_ROLES)[number];
export type StaffRole = (typeof STAFF_ROLES)[number];
export type SessionRole = UserRole;

export function isUserRole(role: string | null | undefined): role is UserRole {
  return USER_ROLES.includes(role as UserRole);
}

export function isStaffRole(
  role: string | null | undefined,
): role is StaffRole {
  return STAFF_ROLES.includes(role as StaffRole);
}

export function isAdminRole(role: string | null | undefined): role is "ADMIN" {
  return role === "ADMIN";
}

export function sanitizeSignupRole(role: unknown): PublicRole {
  if (role === "BLOGGER" || role === "blogger" || role === "creator") {
    return "BLOGGER";
  }
  if (role === "BRAND" || role === "brand") return "BRAND";
  return "USER";
}
