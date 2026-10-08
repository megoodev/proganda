"use server";

import { prisma } from "@/lib/prisma";
import { publicAction } from "@/lib/actions/create-action";
import { toJson } from "@/lib/json";
import { upper } from "@/lib/enum";
import { submitRequestSchema } from "../schemas";

// Public: consultation, campaign, ad and job requests all come through here.
// Throttled per IP (see lib/rate-limit.ts). Linked to the user when they are signed in.
// TODO: notify the team by email (Resend) after creating the request.
export const submitRequest = publicAction({
  rateLimitKey: "request:submit",
  schema: submitRequestSchema,
  revalidate: ["/[locale]/admin/requests", "/[locale]/admin"],
  handler: async (input, { user }) => {
    const row = await prisma.request.create({
      data: {
        type: upper(input.type),
        fromName: input.fromName,
        fromEmail: input.fromEmail,
        fromPhone: input.fromPhone || null,
        subject: input.subject,
        message: input.message || null,
        payload: toJson(input.payload),
        attachmentUrl: input.type === "job" ? input.payload.cvUrl ?? null : null,
        userId: user?.userId ?? null,
      },
    });
    return { id: row.id };
  },
});
