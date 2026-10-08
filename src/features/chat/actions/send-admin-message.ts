"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { can } from "@/features/admin/permissions";
import { sendMessageSchema } from "../schemas";
import { toChatMessage } from "../mappers";

export const sendAdminMessage = adminAction({
  roles: can.chat,
  schema: sendMessageSchema,
  handler: async ({ conversationId, text }, { actor }) => {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { blogger: { select: { status: true } } },
    });
    if (!conversation) throw new AppError("NOT_FOUND");
    if (conversation.blogger.status !== "CONTRACTED") throw new AppError("FORBIDDEN", "NOT_CONTRACTED");

    const [message] = await prisma.$transaction([
      prisma.message.create({ data: { conversationId, sender: "ADMIN", senderUserId: actor.userId, text } }),
      prisma.conversation.update({ where: { id: conversationId }, data: { lastMessageAt: new Date() } }),
    ]);
    return toChatMessage(message);
  },
});
