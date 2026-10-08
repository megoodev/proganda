"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { assertNotLastSuperAdmin } from "../guards";
import { can } from "../permissions";
import { setAdminActiveSchema } from "../schemas";
import { toAdminUser } from "../mappers";

export const setAdminActive = adminAction({
  roles: can.admins,
  schema: setAdminActiveSchema,
  audit: { action: "admin_active_changed", entity: "admin", entityId: (input) => input.id, details: (input) => (input.active ? "active" : "inactive") },
  revalidate: ["/[locale]/admin/admins"],
  handler: async ({ id, active }) => {
    if (!active) await assertNotLastSuperAdmin(id);
    return toAdminUser(await prisma.staffProfile.update({ where: { id }, data: { active } }));
  },
});
