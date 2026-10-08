import "server-only";
import { prisma } from "@/lib/prisma";
import { lower } from "@/lib/enum";
import { AppError } from "@/lib/actions/result";
import { requireActor } from "@/features/admin/auth";
import { can, contractRolesByParty } from "@/features/admin/permissions";
import { toContract } from "../mappers";

export async function getContract(id: string) {
  const actor = await requireActor(can.contracts);
  const row = await prisma.contractRequest.findUnique({
    where: { id },
    include: { blogger: { select: { name: true } }, brand: { select: { name: true } } },
  });
  if (!row) return null;
  if (!contractRolesByParty[lower(row.partyType) as "blogger" | "brand"].includes(actor.role)) throw new AppError("FORBIDDEN");
  return toContract(row);
}
