"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { upper } from "@/lib/enum";
import { can } from "@/features/admin/permissions";
import { setBrandStatusSchema } from "../schemas";
import { toBrand } from "../mappers";

export const setBrandStatus = adminAction({
  roles: can.brands,
  schema: setBrandStatusSchema,
  audit: { action: "brand_status_changed", entity: "brand", entityId: (input) => input.id, details: (input) => input.status },
  revalidate: ["/[locale]/admin/brands", "/[locale]/admin"],
  handler: async ({ id, status }) =>
    toBrand(await prisma.brandProfile.update({ where: { id }, data: { status: upper(status) } })),
});
