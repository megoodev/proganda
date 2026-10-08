"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { brandProfileInputSchema } from "../schemas";
import { toBrandData, toBrandDetail } from "../mappers";

// A brand edits ONLY its own profile (looked up by session user id).
export const updateBrandProfile = userAction({
  schema: brandProfileInputSchema,
  revalidate: ["/[locale]/admin/brands"],
  handler: async (input, { user }) =>
    toBrandDetail(await prisma.brandProfile.update({ where: { userId: user.userId }, data: toBrandData(input) })),
});
