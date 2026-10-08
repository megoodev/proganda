"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { lower } from "@/lib/enum";
import { can } from "@/features/admin/permissions";
import type { AdminRole } from "@/features/admin/roles";
import { assignConversationSchema } from "../schemas";

// Super admin picks which admin looks after a blogger's conversation (null = nobody).
export const assignConversationManager = adminAction({
  roles: ["super_admin"],
  schema: assignConversationSchema,
  audit: { action: "conversation_assigned", entity: "chat", entityId: (input) => input.conversationId, details: (input) => input.managerId ?? "unassigned" },
  revalidate: ["/[locale]/admin/chat"],
  handler: async ({ conversationId, managerId }) => {
    if (managerId) {
      const manager = await prisma.staffProfile.findUnique({ where: { id: managerId } });
      if (!manager || !manager.active || !can.chat.includes(lower(manager.adminRole) as AdminRole)) {
        throw new AppError("VALIDATION", "INVALID_MANAGER");
      }
    }
    await prisma.conversation.update({ where: { id: conversationId }, data: { managerId } });
    return { conversationId, managerId };
  },
});
