import "server-only";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/actions/result";
import { getActor, requireUser, type Actor, type SessionUser } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";

export type ChatViewer =
  | { viewer: "admin"; actor: Actor }
  | { viewer: "blogger"; user: SessionUser; bloggerId: string };

/**
 * Who is looking at this conversation?
 * - an admin whose role can use the chat, or
 * - the blogger who owns it, ONLY while their contract is active.
 * Anyone else gets FORBIDDEN.
 */
export async function resolveChatViewer(conversationId: string): Promise<ChatViewer> {
  const actor = await getActor();
  if (actor && can.chat.includes(actor.role)) return { viewer: "admin", actor };

  const user = await requireUser();
  const blogger = await prisma.bloggerProfile.findUnique({
    where: { userId: user.userId },
    select: { id: true, status: true, conversation: { select: { id: true } } },
  });
  if (!blogger || blogger.status !== "CONTRACTED" || blogger.conversation?.id !== conversationId) {
    throw new AppError("FORBIDDEN");
  }
  return { viewer: "blogger", user, bloggerId: blogger.id };
}
