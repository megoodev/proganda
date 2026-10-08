import "server-only";
import { prisma } from "@/lib/prisma";
import { resolveChatViewer } from "../access";
import { listMessagesSchema } from "../schemas";
import { toChatMessage } from "../mappers";

type Params = { conversationId: string; after?: string; limit?: number };

/**
 * Thread messages, oldest first. For polling pass the last `sentAt` you have as `after`
 * (TanStack Query refetchInterval). Works for the admin and for the conversation's blogger.
 */
export async function listMessages(params: Params) {
  const { conversationId, after, limit } = listMessagesSchema.parse(params);
  await resolveChatViewer(conversationId);

  const rows = await prisma.message.findMany({
    where: { conversationId, ...(after ? { createdAt: { gt: new Date(after) } } : {}) },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  return rows.map(toChatMessage);
}
