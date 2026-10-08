"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";

// "I want to apply for an official contract": a blogger or a brand asks for one.
// The party type is derived from which profile the user has, never trusted from the client.
export const requestContract = userAction({
  schema: z.object({}),
  revalidate: ["/[locale]/admin/contracts", "/[locale]/admin"],
  handler: async (_, { user }) => {
    const [blogger, brand] = await Promise.all([
      prisma.bloggerProfile.findUnique({ where: { userId: user.userId }, select: { id: true, status: true } }),
      prisma.brandProfile.findUnique({ where: { userId: user.userId }, select: { id: true, status: true } }),
    ]);

    const profile = blogger ?? brand;
    if (!profile) throw new AppError("NOT_FOUND", "PROFILE_REQUIRED");
    if (profile.status === "CONTRACTED") throw new AppError("CONFLICT", "ALREADY_CONTRACTED");

    const pending = await prisma.contractRequest.count({
      where: { status: "PENDING", ...(blogger ? { bloggerId: blogger.id } : { brandId: brand!.id }) },
    });
    if (pending > 0) throw new AppError("CONFLICT", "REQUEST_ALREADY_PENDING");

    const row = await prisma.contractRequest.create({
      data: blogger
        ? { partyType: "BLOGGER", bloggerId: blogger.id }
        : { partyType: "BRAND", brandId: brand!.id },
    });
    return { id: row.id };
  },
});
