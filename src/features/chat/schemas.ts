import { z } from "zod";

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

export type ChatMessage = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
