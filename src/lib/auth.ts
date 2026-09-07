export type SessionRole = "brand" | "creator" | "team";

export type AuthResult =
  | { authorized: true; role: SessionRole; token: string }
  | { authorized: false; reason: "UNAUTHORIZED" | "FORBIDDEN" };

export async function validateSession(
  requiredRole?: SessionRole,
): Promise<AuthResult> {
  const token = process.env.PROGANDA_ACTION_TOKEN;

  if (!token) {
    return { authorized: false, reason: "UNAUTHORIZED" };
  }

  const role = (process.env.PROGANDA_SESSION_ROLE ?? "brand") as SessionRole;
  if (requiredRole && role !== requiredRole && role !== "team") {
    return { authorized: false, reason: "FORBIDDEN" };
  }

  return { authorized: true, role, token };
}
