"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { upper } from "@/lib/enum";
import { assertNotLastSuperAdmin } from "../guards";
import { can } from "../permissions";
import { setAdminRoleSchema } from "../schemas";
import { toAdminUser } from "../mappers";

export const setAdminRole = adminAction({
  roles: can.admins,
  schema: setAdminRoleSchema,
  audit: { action: "admin_role_changed", entity: "admin", entityId: (input) => input.id, details: (input) => input.role },
  revalidate: ["/[locale]/admin/admins"],
  handler: async ({ id, role }) => {
    if (role !== "super_admin") await assertNotLastSuperAdmin(id);
    return toAdminUser(await prisma.staffProfile.update({ where: { id }, data: { adminRole: upper(role) } }));
  },
});
