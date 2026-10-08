import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "../auth";
import { can } from "../permissions";
import { toAdminUser } from "../mappers";

export async function getAdmin(id: string) {
  await requireActor(can.admins);
  const row = await prisma.staffProfile.findUnique({ where: { id } });
  return row ? toAdminUser(row) : null;
}

/** Active staff that can be picked as an assignee. */
export async function listAssignableAdmins() {
  await requireActor(can.requests);
  const rows = await prisma.staffProfile.findMany({ where: { active: true }, orderBy: { name: "asc" } });
  return rows.map(toAdminUser);
}
