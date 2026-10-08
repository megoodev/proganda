"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { bloggerProfileInputSchema } from "../schemas";
import { toBloggerData, toBloggerDetail } from "../mappers";

// Called at blogger signup. One profile per user: a second call returns CONFLICT.
// Starts as PENDING; an admin approves the contract later.
export const createBloggerProfile = userAction({
  schema: bloggerProfileInputSchema,
  revalidate: ["/[locale]/admin/bloggers", "/[locale]/admin"],
  handler: async (input, { user }) =>
    toBloggerDetail(await prisma.bloggerProfile.create({ data: { userId: user.userId, ...toBloggerData(input) } })),
});
