"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { messageIdSchema } from "../schemas";

// Moderation: super admin only, always logged.
export const deleteMessage = adminAction({
  roles: ["super_admin"],
  schema: messageIdSchema,
  audit: { action: "message_deleted", entity: "chat", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/chat"],
  handler: async ({ id }) => {
    await prisma.message.delete({ where: { id } });
    return { id };
  },
});
