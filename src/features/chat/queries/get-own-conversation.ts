import "server-only";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/features/admin/auth";

/** Blogger side: their conversation id (null until the contract is approved). */
export async function getOwnConversationId() {
  const user = await getSessionUser();
  if (!user) return null;
  const blogger = await prisma.bloggerProfile.findUnique({
    where: { userId: user.userId },
    select: { status: true, conversation: { select: { id: true } } },
  });
  return blogger?.status === "CONTRACTED" ? (blogger.conversation?.id ?? null) : null;
}
