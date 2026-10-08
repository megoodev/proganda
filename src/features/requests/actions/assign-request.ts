"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { lower } from "@/lib/enum";
import { can } from "@/features/admin/permissions";
import type { AdminRole } from "@/features/admin/roles";
import { assertTypeAccess } from "../access";
import { typesForRole } from "../role-types";
import { assignRequestSchema, type RequestType } from "../schemas";
import { toAdminRequest } from "../mappers";

// Anyone who can see the request may assign it, but only to an ACTIVE admin who can handle its type.
export const assignRequest = adminAction({
  roles: can.requests,
  schema: assignRequestSchema,
  audit: { action: "request_assigned", entity: "request", entityId: (input) => input.id, details: (input) => input.assignedToId ?? "unassigned" },
  revalidate: ["/[locale]/admin/requests", "/[locale]/admin"],
  handler: async ({ id, assignedToId }, { actor }) => {
    const current = await prisma.request.findUnique({ where: { id }, select: { type: true } });
    if (!current) throw new AppError("NOT_FOUND");
    assertTypeAccess(actor, current.type);

    if (assignedToId) {
      const assignee = await prisma.staffProfile.findUnique({ where: { id: assignedToId } });
      const role = assignee && (lower(assignee.adminRole) as AdminRole);
      if (!assignee || !assignee.active || !role || !typesForRole[role].includes(lower(current.type) as RequestType)) {
        throw new AppError("VALIDATION", "INVALID_ASSIGNEE");
      }
    }
    return toAdminRequest(await prisma.request.update({ where: { id }, data: { assignedToId } }));
  },
});
