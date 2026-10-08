"use server";

import { prisma } from "@/lib/prisma";
import { adminAction } from "@/lib/actions/create-action";
import { AppError } from "@/lib/actions/result";
import { lower, upper } from "@/lib/enum";
import { can, contractRolesByParty } from "@/features/admin/permissions";
import { ensureConversation } from "@/features/chat/ensure-conversation";
import { reviewContractSchema } from "../schemas";
import { toContract } from "../mappers";

// approved -> the profile becomes CONTRACTED (and a blogger gets a chat conversation)
// rejected -> the profile goes back to PENDING;  pending -> only the notes change
export const reviewContract = adminAction({
  roles: can.contracts,
  schema: reviewContractSchema,
  audit: {
    action: (input) =>
      input.status === "approved" ? "contract_approved" : input.status === "rejected" ? "contract_rejected" : "contract_reset",
    entity: "contract",
    entityId: (input) => input.id,
    details: (_, out) => out.party,
  },
  revalidate: ["/[locale]/admin/contracts", "/[locale]/admin/bloggers", "/[locale]/admin/brands", "/[locale]/admin/chat", "/[locale]/admin"],
  handler: async ({ id, status, notes }, { actor }) =>
    toContract(
      await prisma.$transaction(async (tx) => {
        const current = await tx.contractRequest.findUnique({ where: { id } });
        if (!current) throw new AppError("NOT_FOUND");
        if (!contractRolesByParty[lower(current.partyType) as "blogger" | "brand"].includes(actor.role)) {
          throw new AppError("FORBIDDEN");
        }

        const updated = await tx.contractRequest.update({
          where: { id },
          data: { status: upper(status), notes, reviewedById: actor.id, reviewedAt: new Date() },
          include: { blogger: { select: { name: true } }, brand: { select: { name: true } } },
        });

        if (status !== "pending") {
          const profileStatus = status === "approved" ? "CONTRACTED" : "PENDING";
          if (current.bloggerId) {
            await tx.bloggerProfile.update({ where: { id: current.bloggerId }, data: { status: profileStatus } });
            if (status === "approved") await ensureConversation(tx, current.bloggerId);
          }
          if (current.brandId) {
            await tx.brandProfile.update({ where: { id: current.brandId }, data: { status: profileStatus } });
          }
        }
        return updated;
      }),
    ),
});
