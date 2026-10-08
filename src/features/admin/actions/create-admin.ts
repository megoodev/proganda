"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { upper } from "@/lib/enum";
import { can } from "../permissions";
import { adminFormSchema } from "../schemas";
import { toAdminUser } from "../mappers";

// Creates the StaffProfile only. The login account is linked on first sign-in by email.
// TODO: send the invitation email (Resend) from here.
export const createAdmin = adminAction({
  roles: can.admins,
  schema: adminFormSchema,
  audit: { action: "admin_created", entity: "admin", entityId: (_, out) => out.id, details: (input) => `${input.email} (${input.role})` },
  revalidate: ["/[locale]/admin/admins"],
  handler: async (input) =>
    toAdminUser(await prisma.staffProfile.create({ data: { name: input.name, email: input.email, adminRole: upper(input.role) } })),
});
