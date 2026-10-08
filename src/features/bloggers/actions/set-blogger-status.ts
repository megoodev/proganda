"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { upper } from "@/lib/enum";
import { can } from "@/features/admin/permissions";
import { ensureConversation } from "@/features/chat/ensure-conversation";
import { setBloggerStatusSchema } from "../schemas";
import { toBlogger } from "../mappers";

export const setBloggerStatus = adminAction({
  roles: can.bloggers,
  schema: setBloggerStatusSchema,
  audit: { action: "blogger_status_changed", entity: "blogger", entityId: (input) => input.id, details: (input) => input.status },
  revalidate: ["/[locale]/admin/bloggers", "/[locale]/admin", "/[locale]/admin/chat"],
  handler: async ({ id, status }) =>
    toBlogger(
      await prisma.$transaction(async (tx) => {
        const row = await tx.bloggerProfile.update({ where: { id }, data: { status: upper(status) } });
        if (status === "contracted") await ensureConversation(tx, id); // chat is unlocked by the contract
        return row;
      }),
    ),
});
