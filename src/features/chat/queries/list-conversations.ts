import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toConversationSummary } from "../mappers";

/** Admin chat list: latest message + unread count (messages from the blogger not yet read). */
export async function listConversations() {
  await requireActor(can.chat);
  const rows = await prisma.conversation.findMany({
    include: {
      blogger: { select: { name: true } },
      manager: { select: { name: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: { where: { sender: "BLOGGER", readAt: null } } } },
    },
    orderBy: [{ lastMessageAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
  });
  return rows.map(toConversationSummary);
}
