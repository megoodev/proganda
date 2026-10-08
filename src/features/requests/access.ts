import "server-only";
import { AppError } from "@/lib/actions/result";
import { lower } from "@/lib/enum";
import type { Actor } from "@/features/admin/auth";
import { typesForRole } from "./role-types";
import type { RequestType } from "./schemas";

/** Throws FORBIDDEN unless the actor's role can handle this request type. */
export function assertTypeAccess(actor: Actor, type: string) {
  if (!typesForRole[actor.role].includes(lower(type) as RequestType)) throw new AppError("FORBIDDEN");
}
