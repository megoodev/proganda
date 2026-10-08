import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toBrand } from "../mappers";

export async function listBrands() {
  await requireActor(can.brands);
  return (await prisma.brandProfile.findMany({ orderBy: { createdAt: "desc" } })).map(toBrand);
}
