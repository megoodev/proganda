import "server-only";

import { z } from "zod";
import type { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { assertSafeHttpUrl } from "@/lib/sanitize";

// Your existing file + `followers` -> audienceSize, optional contract request,
// and `rollbackFailedSignup`. Keep any other exports you already have.

const signupProfileSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["USER", "BLOGGER", "BRAND"]), // ADMIN is never self-assignable
  applyForContract: z.boolean().optional(),
  phone: z.string().trim().max(40).optional(),
  city: z.string().trim().max(80).optional(),
  governorate: z.string().trim().max(80).optional(),
  company: z.string().trim().max(160).optional(),
  industry: z.string().trim().max(120).optional(),
  goal: z.string().trim().max(1200).optional(),
  website: z.string().trim().max(500).optional(),
  niche: z.string().trim().max(120).optional(),
  handles: z.string().trim().max(1000).optional(),
  portfolio: z.string().trim().max(500).optional(),
  followers: z.string().trim().max(80).optional(),
  monthlyViews: z.string().trim().max(80).optional(),
});

const toList = (value?: string) =>
  (value || "")
    .split(/[\n,،]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

export async function bootstrapAccountProfilesFromAuth(input: {
  userId: string;
  email: string;
  role: UserRole;
  applyForContract?: boolean;
  phone?: string | null;
  city?: string | null;
  governorate?: string | null;
  company?: string | null;
  industry?: string | null;
  goal?: string | null;
  website?: string | null;
  niche?: string | null;
  handles?: string | null;
  portfolio?: string | null;
  followers?: string | null;
  monthlyViews?: string | null;
}) {
  const parsed = signupProfileSchema.parse(input);
  const account = await prisma.user.findUnique({
    where: { id: parsed.userId },
    select: { role: true, email: true },
  });
  if (
    !account ||
    account.role !== "USER" || // brand-new accounts always start as USER
    account.email.toLowerCase() !== parsed.email.toLowerCase()
  ) {
    throw new Error("Account profile role verification failed.");
  }

  const wantsContract =
    parsed.applyForContract === true &&
    (parsed.role === "BLOGGER" || parsed.role === "BRAND");
  const contract = wantsContract
    ? {
        contractStatus: "PENDING" as const,
        contractRequestedAt: new Date(),
      }
    : {};

  await prisma.$transaction(async (tx) => {
    if (parsed.role !== "USER") {
      await tx.user.updateMany({
        where: { id: parsed.userId, role: "USER" },
        data: { role: parsed.role },
      });
    }

    const base = {
      phone: parsed.phone || null,
      city: parsed.city || null,
      governorate: parsed.governorate || null,
    };
    await tx.profile.upsert({
      where: { userId: parsed.userId },
      create: { userId: parsed.userId, ...base },
      update: base,
    });

    if (parsed.role === "BLOGGER") {
      const data = {
        niche: parsed.niche || null,
        socialLinks: toList(parsed.handles),
        portfolioUrl: parsed.portfolio
          ? assertSafeHttpUrl(parsed.portfolio)
          : null,
        audienceSize: parsed.followers || null,
        monthlyViews: parsed.monthlyViews || null,
        ...contract,
      };
      await tx.bloggerProfile.upsert({
        where: { userId: parsed.userId },
        create: { userId: parsed.userId, ...data },
        update: data,
      });
    }

    if (parsed.role === "BRAND") {
      const data = {
        companyName: parsed.company || null,
        industry: parsed.industry || null,
        website: parsed.website ? assertSafeHttpUrl(parsed.website) : null,
        campaignGoals: parsed.goal || null,
        ...contract,
      };
      await tx.brandProfile.upsert({
        where: { userId: parsed.userId },
        create: { userId: parsed.userId, ...data },
        update: data,
      });
    }
  });
}

/** Used only when profile creation fails right after sign-up (cascade removes sessions/accounts). */
export async function rollbackFailedSignup(userId: string) {
  await prisma.user.delete({ where: { id: userId } }).catch(() => undefined);
}