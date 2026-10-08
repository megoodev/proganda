"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { serviceIdSchema } from "../schemas";

export const deleteService = adminAction({
  roles: can.services,
  schema: serviceIdSchema,
  audit: { action: "service_deleted", entity: "service", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/services", "/[locale]/services"],
  handler: async ({ id }) => {
    await prisma.service.delete({ where: { id } });
    return { id };
  },
});
