"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { serviceSchema } from "../schemas";
import { toService } from "../mappers";

export const createService = adminAction({
  roles: can.services,
  schema: serviceSchema,
  audit: { action: "service_created", entity: "service", entityId: (_, out) => out.id, details: (input) => input.title },
  revalidate: ["/[locale]/admin/services", "/[locale]/services"],
  handler: async (input) => toService(await prisma.service.create({ data: input })),
});
