"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { upper } from "@/lib/enum";
import { can } from "@/features/admin/permissions";
import { assertTypeAccess } from "../access";
import { updateRequestStatusSchema } from "../schemas";
import { toAdminRequest } from "../mappers";

export const updateRequestStatus = adminAction({
  roles: can.requests,
  schema: updateRequestStatusSchema,
  audit: { action: "request_status_changed", entity: "request", entityId: (input) => input.id, details: (input) => input.status },
  revalidate: ["/[locale]/admin/requests", "/[locale]/admin"],
  handler: async ({ id, status }, { actor }) => {
    const current = await prisma.request.findUnique({ where: { id }, select: { type: true } });
    if (!current) throw new AppError("NOT_FOUND");
    assertTypeAccess(actor, current.type);
    return toAdminRequest(await prisma.request.update({ where: { id }, data: { status: upper(status) } }));
  },
});
