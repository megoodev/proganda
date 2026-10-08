"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { conversationIdSchema } from "../schemas";

// Blogger opened their thread: the admins' messages become read.
export const markBloggerRead = userAction({
  schema: conversationIdSchema,
  handler: async ({ conversationId }, { user }) => {
    const blogger = await prisma.bloggerProfile.findUnique({
      where: { userId: user.userId },
      select: { conversation: { select: { id: true } } },
    });
    if (blogger?.conversation?.id !== conversationId) throw new AppError("FORBIDDEN");

    const { count } = await prisma.message.updateMany({
      where: { conversationId, sender: "ADMIN", readAt: null },
      data: { readAt: new Date() },
    });
    return { count };
  },
});
