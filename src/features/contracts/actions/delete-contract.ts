"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { contractIdSchema } from "../schemas";

export const deleteContract = adminAction({
  roles: ["super_admin"],
  schema: contractIdSchema,
  audit: { action: "contract_deleted", entity: "contract", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/contracts", "/[locale]/admin"],
  handler: async ({ id }) => {
    await prisma.contractRequest.delete({ where: { id } });
    return { id };
  },
});
