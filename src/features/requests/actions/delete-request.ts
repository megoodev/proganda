"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { requestIdSchema } from "../schemas";

export const deleteRequest = adminAction({
  roles: can.requestsDelete,
  schema: requestIdSchema,
  audit: { action: "request_deleted", entity: "request", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/requests", "/[locale]/admin"],
  handler: async ({ id }) => {
    await prisma.request.delete({ where: { id } });
    return { id };
  },
});
