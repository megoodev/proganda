import "server-only";
import { prisma } from "@/lib/prisma";
import { upper } from "@/lib/enum";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { typesForRole } from "../role-types";
import { toAdminRequest } from "../mappers";

/** Shared inbox: each role only gets the request types it manages. Filtering/search happen client-side. */
export async function listRequests() {
  const actor = await requireActor(can.requests);
  const types = typesForRole[actor.role].map((type) => upper(type));
  if (types.length === 0) return [];

  const rows = await prisma.request.findMany({
    where: { type: { in: types } },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return rows.map(toAdminRequest);
}
