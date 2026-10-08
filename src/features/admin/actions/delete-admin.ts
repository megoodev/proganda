"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { idSchema } from "@/lib/validators";
import { assertNotLastSuperAdmin } from "../guards";
import { can } from "../permissions";

export const deleteAdmin = adminAction({
  roles: can.admins,
  schema: idSchema,
  audit: { action: "admin_deleted", entity: "admin", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/admins"],
  handler: async ({ id }, { actor }) => {
    if (id === actor.id) throw new AppError("FORBIDDEN", "CANNOT_DELETE_SELF");
    await assertNotLastSuperAdmin(id);
    await prisma.staffProfile.delete({ where: { id } });
    return { id };
  },
});
