"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { brandProfileInputSchema } from "../schemas";
import { toBrandData, toBrandDetail } from "../mappers";

// Called at brand signup. One profile per user: a second call returns CONFLICT.
export const createBrandProfile = userAction({
  schema: brandProfileInputSchema,
  revalidate: ["/[locale]/admin/brands", "/[locale]/admin"],
  handler: async (input, { user }) =>
    toBrandDetail(await prisma.brandProfile.create({ data: { userId: user.userId, ...toBrandData(input) } })),
});
