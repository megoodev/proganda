import { z } from "zod";
import { idSchema, optionalPhone } from "@/lib/validators";
import { platforms } from "@/features/portfolio/schemas";

export const requestTypes = ["consultation", "campaign", "ad", "job"] as const;
export const requestStatuses = ["new", "in_review", "in_progress", "done", "rejected"] as const;

// Read model used by the dashboard inbox
export const requestSchema = z.object({
  id: z.string(),
  type: z.enum(requestTypes),
  from: z.string(),
  subject: z.string(),
  status: z.enum(requestStatuses),
  assignedTo: z.string().nullable(), // staff profile id
  createdAt: z.string(),
});

// ---- Public form (Start Project / Join Us / Consultation). One schema, one branch per request type ----
const contact = {
  fromName: z.string().min(2).max(120),
  fromEmail: z.string().email(),
  fromPhone: optionalPhone,
  subject: z.string().min(3).max(200),
  message: z.string().max(4000).optional(),
};

export const submitRequestSchema = z.discriminatedUnion("type", [
  z.object({
    ...contact,
    type: z.literal("consultation"),
    payload: z.object({ track: z.string().max(80).optional(), preferredAt: z.string().max(40).optional() }).default({}),
  }),
  z.object({
    ...contact,
    type: z.literal("campaign"),
    payload: z
      .object({
        budget: z.string().max(60).optional(),
        goal: z.string().max(200).optional(),
        duration: z.string().max(60).optional(),
        platforms: z.array(z.enum(platforms)).max(5).optional(),
      })
      .default({}),
  }),
  z.object({
    ...contact,
    type: z.literal("ad"),
    payload: z
      .object({
        brandName: z.string().max(120).optional(),
        placement: z.enum(["home", "offers"]).optional(),
        startsAt: z.string().max(10).optional(),
        endsAt: z.string().max(10).optional(),
      })
      .default({}),
  }),
  z.object({
    ...contact,
    type: z.literal("job"),
    payload: z.object({ position: z.string().min(2).max(120), cvUrl: z.string().url().optional() }),
  }),
]);

export const updateRequestStatusSchema = idSchema.extend({ status: z.enum(requestStatuses) });
export const assignRequestSchema = idSchema.extend({ assignedToId: z.string().min(1).nullable() });
export const requestIdSchema = idSchema;

export type RequestType = (typeof requestTypes)[number];
export type RequestStatus = (typeof requestStatuses)[number];
export type AdminRequest = z.infer<typeof requestSchema>;
export type SubmitRequestInput = z.input<typeof submitRequestSchema>;
export type RequestDetail = AdminRequest & {
  email: string; phone?: string; message?: string; payload: Record<string, unknown>; attachmentUrl?: string;
};
