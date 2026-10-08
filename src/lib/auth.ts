import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  isAdminRole,
  isUserRole,
  isStaffRole,
  type SessionRole,
} from "@/lib/roles";

export type AuthResult =
  | { authorized: true; role: SessionRole; token: string }
  | { authorized: false; reason: "UNAUTHORIZED" | "FORBIDDEN" };

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: appUrl,
  trustedOrigins: [appUrl],

  // تعطيل الـ Rate Limit في بيئة التطوير لتجنب مشكلة تكرار المحاولات على Localhost
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    window: 60, // النافذة الزمنية بالثواني
    max: 100,   // أقصى عدد طلبات مسموح به لكل IP في الإنتاج
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 12,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  plugins: [
    admin({
      defaultRole: "USER",
    }),
    nextCookies(),
  ],
});

export async function getAuthSession(requestHeaders?: Headers) {
  const headersToPass = requestHeaders ?? (await headers());
  return auth.api.getSession({ headers: headersToPass });
}

export async function validateSession(
  requiredRole?: SessionRole,
  requestHeaders?: Headers,
): Promise<AuthResult> {
  try {
    const session = await getAuthSession(requestHeaders);
    if (!session?.user) {
      return { authorized: false, reason: "UNAUTHORIZED" };
    }

    const rawRole = (session.user as { role?: string }).role ?? "USER";
    if (!isUserRole(rawRole)) {
      return { authorized: false, reason: "UNAUTHORIZED" };
    }
    const role = rawRole as SessionRole;

    if (requiredRole && role !== requiredRole && !isStaffRole(role)) {
      return { authorized: false, reason: "FORBIDDEN" };
    }

    return {
      authorized: true,
      role,
      token: session.session.token,
    };
  } catch {
    return { authorized: false, reason: "UNAUTHORIZED" };
  }
}

export async function requireStaff(requestHeaders?: Headers) {
  const session = await getAuthSession(requestHeaders);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || !isStaffRole(role)) {
    return null;
  }
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role,
  };
}

export async function requireAdmin(requestHeaders?: Headers) {
  const staff = await requireStaff(requestHeaders);
  if (!staff || !isAdminRole(staff.role)) return null;
  return staff;
}