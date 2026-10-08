import "server-only";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/actions/result";

/** Throws unless at least one OTHER active super admin exists (so nobody locks the dashboard). */
export async function assertNotLastSuperAdmin(staffId: string) {
  const others = await prisma.staffProfile.count({
    where: { adminRole: "SUPER_ADMIN", active: true, id: { not: staffId } },
  });
  if (others === 0) throw new AppError("FORBIDDEN", "LAST_SUPER_ADMIN");
}
