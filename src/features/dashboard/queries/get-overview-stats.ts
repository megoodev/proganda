import "server-only";
import { prisma } from "@/lib/prisma";
import { upper } from "@/lib/enum";
import { requireActor } from "@/features/admin/auth";
import { adminRoles } from "@/features/admin/roles";
import { getTotalViews } from "@/features/portfolio/queries/get-total-views";
import { typesForRole } from "@/features/requests/role-types";

/** The four numbers on the dashboard Overview. "New requests" respects the admin's role. */
export async function getOverviewStats() {
  const actor = await requireActor(adminRoles);
  const types = typesForRole[actor.role].map((type) => upper(type));

  const [totalViews, newRequests, pendingContracts, activeCreators] = await Promise.all([
    getTotalViews(),
    types.length ? prisma.request.count({ where: { status: "NEW", type: { in: types } } }) : 0,
    prisma.contractRequest.count({ where: { status: "PENDING" } }),
    prisma.bloggerProfile.count({ where: { status: "CONTRACTED" } }),
  ]);
  return { totalViews, newRequests, pendingContracts, activeCreators };
}
