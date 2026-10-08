"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { bloggerProfileInputSchema } from "../schemas";
import { toBloggerData, toBloggerDetail } from "../mappers";

// A blogger edits ONLY their own profile (looked up by session user id, never by a client-sent id).
export const updateBloggerProfile = userAction({
  schema: bloggerProfileInputSchema,
  revalidate: ["/[locale]/admin/bloggers"],
  handler: async (input, { user }) =>
    toBloggerDetail(await prisma.bloggerProfile.update({ where: { userId: user.userId }, data: toBloggerData(input) })),
});
