import "server-only";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { z } from "zod";
import { getSessionUser, requireActor, requireUser, type Actor, type SessionUser } from "@/features/admin/auth";
import type { AdminRole } from "@/features/admin/roles";
import { logAction } from "@/features/audit/log-action";
import type { AuditAction, AuditEntity } from "@/features/audit/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { AppError, type ActionResult } from "./result";

/**
 * Every Server Action in the project is built with one of these three factories, so each one
 * gets the same pipeline: auth -> validation -> handler -> audit log -> revalidate -> typed result.
 * They never throw to the client: they always resolve to an ActionResult.
 */

type AuditSpec<I, O> = {
  action: AuditAction | ((input: I, output: O) => AuditAction);
  entity: AuditEntity;
  entityId: (input: I, output: O) => string;
  details?: (input: I, output: O) => string;
};

type Common<S extends z.ZodTypeAny, O, C> = {
  schema: S;
  handler: (input: z.output<S>, ctx: C) => Promise<O>;
  /** Route patterns to revalidate, e.g. "/[locale]/admin/services" */
  revalidate?: string[];
};

function parse<S extends z.ZodTypeAny>(schema: S, raw: unknown): z.output<S> {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new AppError("VALIDATION", "Invalid input", parsed.error.flatten().fieldErrors as Record<string, string[]>);
  }
  return parsed.data;
}

function hasCode(error: unknown, code: string) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === code;
}

async function run<O>(task: () => Promise<O>, revalidate?: string[]): Promise<ActionResult<O>> {
  try {
    const data = await task();
    revalidate?.forEach((path) => revalidatePath(path, "page"));
    return { ok: true, data };
  } catch (error) {
    if (error instanceof AppError) {
      return { ok: false, error: error.code, message: error.message, fieldErrors: error.fieldErrors };
    }
    if (hasCode(error, "P2002")) return { ok: false, error: "CONFLICT", message: "Already exists" }; // Prisma unique constraint
    if (hasCode(error, "P2025")) return { ok: false, error: "NOT_FOUND", message: "Not found" }; // Prisma record not found
    console.error("[action]", error);
    return { ok: false, error: "INTERNAL", message: "Something went wrong" };
  }
}

async function writeAudit<I, O>(actor: Actor, spec: AuditSpec<I, O>, input: I, output: O) {
  try {
    await logAction({
      actorId: actor.id,
      actorName: actor.name,
      action: typeof spec.action === "function" ? spec.action(input, output) : spec.action,
      entity: spec.entity,
      entityId: spec.entityId(input, output),
      details: spec.details?.(input, output) ?? "",
    });
  } catch (error) {
    console.error("[audit]", error); // a logging failure must not undo the operation
  }
}

/** Admin-only action. `roles` is the permission check (see features/admin/permissions.ts). */
export function adminAction<S extends z.ZodTypeAny, O>(
  config: Common<S, O, { actor: Actor }> & { roles: readonly AdminRole[]; audit?: AuditSpec<z.output<S>, O> },
) {
  return async (raw: z.input<S>): Promise<ActionResult<O>> =>
    run(async () => {
      const actor = await requireActor(config.roles);
      const input = parse(config.schema, raw);
      const output = await config.handler(input, { actor });
      if (config.audit) await writeAudit(actor, config.audit, input, output);
      return output;
    }, config.revalidate);
}

/** Any signed-in user (blogger, brand, user). */
export function userAction<S extends z.ZodTypeAny, O>(config: Common<S, O, { user: SessionUser }>) {
  return async (raw: z.input<S>): Promise<ActionResult<O>> =>
    run(async () => {
      const user = await requireUser();
      const input = parse(config.schema, raw);
      return config.handler(input, { user });
    }, config.revalidate);
}

/** No login required (public forms). `rateLimitKey` throttles per IP. */
export function publicAction<S extends z.ZodTypeAny, O>(
  config: Common<S, O, { user: SessionUser | null }> & { rateLimitKey?: string },
) {
  return async (raw: z.input<S>): Promise<ActionResult<O>> =>
    run(async () => {
      if (config.rateLimitKey) {
        const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        await rateLimit(`${config.rateLimitKey}:${ip}`);
      }
      const input = parse(config.schema, raw);
      const user = await getSessionUser().catch(() => null);
      return config.handler(input, { user });
    }, config.revalidate);
}

