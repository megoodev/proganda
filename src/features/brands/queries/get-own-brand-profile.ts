import "server-only";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/features/admin/auth";
import { toBrandDetail } from "../mappers";

/** The signed-in brand's own profile (brand dashboard). */
export async function getOwnBrandProfile() {
  const user = await getSessionUser();
  if (!user) return null;
  const row = await prisma.brandProfile.findUnique({ where: { userId: user.userId } });
  return row ? toBrandDetail(row) : null;
}
