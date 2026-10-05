import "server-only";

import { cache } from "react";
import type { UserRole } from "@/generated/prisma/enums";
import { getAuthSession } from "@/lib/auth";
import { isUserRole } from "@/lib/roles";

export type SessionDTO = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AccessErrorCode = "UNAUTHENTICATED" | "FORBIDDEN";

export class AccessError extends Error {
  constructor(public readonly code: AccessErrorCode) {
    super(code);
    this.name = "AccessError";
  }
}

export const verifySession = cache(async (): Promise<SessionDTO | null> => {
  try {
    const session = await getAuthSession();
    if (!session?.user) return null;

    const user = session.user as {
      id: string;
      name: string;
      email: string;
      role?: string;
      banned?: boolean | null;
    };

    if (user.banned === true || !isUserRole(user.role)) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
});

export async function requireRole(role: UserRole): Promise<SessionDTO> {
  const session = await verifySession();
  if (!session) throw new AccessError("UNAUTHENTICATED");
  if (session.role !== role && session.role !== "ADMIN") {
    throw new AccessError("FORBIDDEN");
  }
  return session;
}
