import "server-only";
import { prisma } from "@/lib/prisma";
import { upper } from "@/lib/enum";
import { requireActor } from "@/features/admin/auth";
import { can, contractRolesByParty } from "@/features/admin/permissions";
import { toContract } from "../mappers";

export async function listContracts() {
  const actor = await requireActor(can.contracts);
  const parties = (["blogger", "brand"] as const).filter((party) => contractRolesByParty[party].includes(actor.role));

  const rows = await prisma.contractRequest.findMany({
    where: { partyType: { in: parties.map((party) => upper(party)) } },
    include: { blogger: { select: { name: true } }, brand: { select: { companyName: true, contactName: true } } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toContract);
}