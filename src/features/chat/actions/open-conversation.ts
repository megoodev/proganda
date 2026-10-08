"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { conversationIdSchema } from "../schemas";
import { toChatMessage } from "../mappers";

export const openConversation = adminAction({
  roles: can.chat,
  schema: conversationIdSchema,
  handler: async ({ conversationId }) => {
    await prisma.message.updateMany({
      where: { conversationId, sender: "BLOGGER", readAt: null },
      data: { readAt: new Date() },
    });
    const rows = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 200,
    });
    return rows.map(toChatMessage);
  },
});
