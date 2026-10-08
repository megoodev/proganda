import "server-only";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/features/admin/auth";

/** The signed-in blogger/brand's own contract requests. Admin notes are NOT returned. */
export async function listOwnContracts() {
  const user = await getSessionUser();
  if (!user) return [];

  const rows = await prisma.contractRequest.findMany({
    where: { OR: [{ blogger: { userId: user.userId } }, { brand: { userId: user.userId } }] },
    orderBy: { createdAt: "desc" },
    select: { id: true, partyType: true, status: true, createdAt: true },
  });
  return rows.map((row) => ({
    id: row.id,
    partyType: row.partyType.toLowerCase() as "blogger" | "brand",
    status: row.status.toLowerCase() as "pending" | "approved" | "rejected",
    createdAt: row.createdAt.toISOString(),
  }));
}
