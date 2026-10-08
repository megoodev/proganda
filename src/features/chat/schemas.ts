import { z } from "zod";
import { idSchema } from "@/lib/validators";

export const messageSchema = z.object({
  id: z.string(),
  from: z.enum(["admin", "blogger"]),
  text: z.string().min(1).max(2000),
  sentAt: z.string(),
});

export const conversationSchema = z.object({
  id: z.string(),
  bloggerName: z.string(),
  managerName: z.string(),
  unread: z.number(),
  messages: z.array(messageSchema),
});

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1),
  text: z.string().trim().min(1).max(2000),
});
export const listMessagesSchema = z.object({
  conversationId: z.string().min(1),
  after: z.string().datetime({ offset: true }).optional(), // polling: only messages newer than this
  limit: z.number().int().min(1).max(200).default(100),
});
export const conversationIdSchema = z.object({ conversationId: z.string().min(1) });
export const assignConversationSchema = conversationIdSchema.extend({ managerId: z.string().min(1).nullable() });
export const messageIdSchema = idSchema;

export type ChatMessage = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
