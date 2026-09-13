// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export type SessionRole = "brand" | "blogger" | "creator" | "team";

export type AuthResult =
  | { authorized: true; role: SessionRole; token: string }
  | { authorized: false; reason: "UNAUTHORIZED" | "FORBIDDEN" };

export const auth = betterAuth({
  database: new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/proganda",
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "brand",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      // Brand-specific fields
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
      // Blogger-specific fields
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
});

export async function validateSession(
  requiredRole?: SessionRole,
  requestHeaders?: Headers,
): Promise<AuthResult> {
  try {
    let headersToPass: Headers;
    if (requestHeaders) {
      headersToPass = requestHeaders;
    } else {
      const { headers } = await import("next/headers");
      headersToPass = await headers();
    }

    const session = await auth.api.getSession({
      headers: headersToPass,
    });

    if (!session || !session.user) {
      const actionToken = process.env.PROGANDA_ACTION_TOKEN;
      if (actionToken) {
        const fallbackRole = (process.env.PROGANDA_SESSION_ROLE ?? "brand") as SessionRole;
        if (requiredRole && fallbackRole !== requiredRole && fallbackRole !== "team") {
          return { authorized: false, reason: "FORBIDDEN" };
        }
        return { authorized: true, role: fallbackRole, token: actionToken };
      }
      return { authorized: false, reason: "UNAUTHORIZED" };
    }

    const role = ((session.user as { role?: string }).role ?? "brand") as SessionRole;
    if (requiredRole && role !== requiredRole && role !== "team") {
      return { authorized: false, reason: "FORBIDDEN" };
    }

    return {
      authorized: true,
      role,
      token: session.session.token,
    };
  } catch {
    const actionToken = process.env.PROGANDA_ACTION_TOKEN;
    if (actionToken) {
      const fallbackRole = (process.env.PROGANDA_SESSION_ROLE ?? "brand") as SessionRole;
      return { authorized: true, role: fallbackRole, token: actionToken };
    }
    return { authorized: false, reason: "UNAUTHORIZED" };
  }
}



