"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { serviceUpdateSchema } from "../schemas";
import { toService } from "../mappers";

export const updateService = adminAction({
  roles: can.services,
  schema: serviceUpdateSchema,
  audit: { action: "service_updated", entity: "service", entityId: (input) => input.id, details: (input) => input.title },
  revalidate: ["/[locale]/admin/services", "/[locale]/services"],
  handler: async ({ id, ...data }) => toService(await prisma.service.update({ where: { id }, data })),
});
