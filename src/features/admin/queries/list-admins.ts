import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "../auth";
import { can } from "../permissions";
import { toAdminUser } from "../mappers";

export async function listAdmins() {
  await requireActor(can.admins);
  const rows = await prisma.staffProfile.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toAdminUser);
}
