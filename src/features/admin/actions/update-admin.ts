"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { upper } from "@/lib/enum";
import { assertNotLastSuperAdmin } from "../guards";
import { can } from "../permissions";
import { adminUpdateSchema } from "../schemas";
import { toAdminUser } from "../mappers";

export const updateAdmin = adminAction({
  roles: can.admins,
  schema: adminUpdateSchema,
  audit: { action: "admin_updated", entity: "admin", entityId: (input) => input.id, details: (input) => `${input.email} (${input.role})` },
  revalidate: ["/[locale]/admin/admins"],
  handler: async ({ id, name, email, role }) => {
    if (role !== "super_admin") {
      const current = await prisma.staffProfile.findUnique({ where: { id }, select: { adminRole: true } });
      if (current?.adminRole === "SUPER_ADMIN") await assertNotLastSuperAdmin(id);
    }
    return toAdminUser(await prisma.staffProfile.update({ where: { id }, data: { name, email, adminRole: upper(role) } }));
  },
});
