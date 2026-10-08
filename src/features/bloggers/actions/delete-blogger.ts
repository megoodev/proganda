"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { bloggerIdSchema } from "../schemas";

// Super admin only. Contract requests and the conversation are removed by the cascade.
export const deleteBlogger = adminAction({
  roles: ["super_admin"],
  schema: bloggerIdSchema,
  audit: { action: "blogger_deleted", entity: "blogger", entityId: (input) => input.id },
  revalidate: ["/[locale]/admin/bloggers", "/[locale]/admin/contracts", "/[locale]/admin/chat", "/[locale]/admin"],
  handler: async ({ id }) => {
    await prisma.bloggerProfile.delete({ where: { id } });
    return { id };
  },
});
