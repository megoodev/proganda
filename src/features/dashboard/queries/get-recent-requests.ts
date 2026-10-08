import "server-only";
import { prisma } from "@/lib/prisma";
import { upper } from "@/lib/enum";
import { requireActor } from "@/features/admin/auth";
import { adminRoles } from "@/features/admin/roles";
import { toAdminRequest } from "@/features/requests/mappers";
import { typesForRole } from "@/features/requests/role-types";

export async function getRecentRequests(take = 6) {
  const actor = await requireActor(adminRoles);
  const types = typesForRole[actor.role].map((type) => upper(type));
  if (types.length === 0) return [];

  const rows = await prisma.request.findMany({ where: { type: { in: types } }, orderBy: { createdAt: "desc" }, take });
  return rows.map(toAdminRequest);
}
