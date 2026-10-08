import { lower } from "@/lib/enum";
import type { ChatMessage, Conversation } from "./schemas";

type MessageRow = { id: string; sender: Parameters<typeof lower>[0]; text: string; createdAt: Date };
type ConversationRow = {
  id: string;
  blogger: { name: string };
  manager: { name: string } | null;
  messages: MessageRow[];
  _count: { messages: number };
};

export const toChatMessage = (row: MessageRow): ChatMessage => ({
  id: row.id,
  from: lower(row.sender) as ChatMessage["from"],
  text: row.text,
  sentAt: row.createdAt.toISOString(),
});

/** `messages` holds only the latest message (list preview); use listMessages for the thread. */
export const toConversationSummary = (row: ConversationRow): Conversation => ({
  id: row.id,
  bloggerName: row.blogger.name,
  managerName: row.manager?.name ?? "",
  unread: row._count.messages,
  messages: row.messages.map(toChatMessage),
});
