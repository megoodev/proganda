"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { can } from "@/features/admin/permissions";
import { conversationIdSchema } from "../schemas";

// Admin opened the thread: the blogger's messages become read.
export const markAdminRead = adminAction({
  roles: can.chat,
  schema: conversationIdSchema,
  handler: async ({ conversationId }) => {
    const { count } = await prisma.message.updateMany({
      where: { conversationId, sender: "BLOGGER", readAt: null },
      data: { readAt: new Date() },
    });
    return { count };
  },
});
