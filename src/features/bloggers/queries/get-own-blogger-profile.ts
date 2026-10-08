import "server-only";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/features/admin/auth";
import { toBloggerDetail } from "../mappers";

/** The signed-in blogger's own profile (blogger dashboard). */
export async function getOwnBloggerProfile() {
  const user = await getSessionUser();
  if (!user) return null;
  const row = await prisma.bloggerProfile.findUnique({ where: { userId: user.userId } });
  return row ? toBloggerDetail(row) : null;
}
