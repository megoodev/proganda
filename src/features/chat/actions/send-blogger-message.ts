"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { sendMessageSchema } from "../schemas";
import { toChatMessage } from "../mappers";

// The blogger can only write in THEIR conversation and only while contracted.
export const sendBloggerMessage = userAction({
  schema: sendMessageSchema,
  handler: async ({ conversationId, text }, { user }) => {
    const blogger = await prisma.bloggerProfile.findUnique({
      where: { userId: user.userId },
      select: { status: true, conversation: { select: { id: true } } },
    });
    if (!blogger || blogger.status !== "CONTRACTED" || blogger.conversation?.id !== conversationId) {
      throw new AppError("FORBIDDEN");
    }

    const [message] = await prisma.$transaction([
      prisma.message.create({ data: { conversationId, sender: "BLOGGER", senderUserId: user.userId, text } }),
      prisma.conversation.update({ where: { id: conversationId }, data: { lastMessageAt: new Date() } }),
    ]);
    return toChatMessage(message);
  },
});
