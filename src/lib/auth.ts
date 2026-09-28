import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import {
  isAdminRole,
  isStaffRole,
  sanitizeSignupRole,
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
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "brand",
        // Public signup may send brand/blogger; privileged roles are stripped in databaseHooks.
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      company: {
        type: "string",
        required: false,
        input: true,
      },
      industry: {
        type: "string",
        required: false,
        input: true,
      },
      budget: {
        type: "string",
        required: false,
        input: true,
      },
      goal: {
        type: "string",
        required: false,
        input: true,
      },
      website: {
        type: "string",
        required: false,
        input: true,
      },
      niche: {
        type: "string",
        required: false,
        input: true,
      },
      handles: {
        type: "string",
        required: false,
        input: true,
      },
      portfolio: {
        type: "string",
        required: false,
        input: true,
      },
      monthlyViews: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const requested = ctx?.body?.role;
          return {
            data: {
              ...user,
              role: sanitizeSignupRole(requested),
            },
          };
        },
      },
    },
  },
  plugins: [
    // Staff gating for the CMS is handled in src/lib/roles.ts (requireStaff);
    // better-auth's admin plugin only needs its default "admin" role.
    admin({
      defaultRole: "brand",
    }),
    nextCookies(),
  ],
});

export async function getAuthSession(requestHeaders?: Headers) {
  const headersToPass =
    requestHeaders ?? (await (await import("next/headers")).headers());
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

    const role = ((session.user as { role?: string }).role ??
      "brand") as SessionRole;

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
  // Demo mode: every visitor is treated as an admin against the in-memory
  // demo store, so the CMS can be explored without a database.
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return {
      id: "demo-admin",
      email: "admin@proganda.studio",
      name: "Demo Admin",
      role: "admin" as const,
    };
  }
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
