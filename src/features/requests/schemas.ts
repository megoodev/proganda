import { z } from "zod";

export const requestTypes = ["consultation", "campaign", "ad", "job"] as const;
export const requestStatuses = ["new", "in_review", "in_progress", "done", "rejected"] as const;

export const requestSchema = z.object({
  id: z.string(),
  type: z.enum(requestTypes),
  from: z.string(),
  subject: z.string(),
  status: z.enum(requestStatuses),
  assignedTo: z.string().nullable(), // admin id
  createdAt: z.string(),
});

export type RequestType = (typeof requestTypes)[number];
export type RequestStatus = (typeof requestStatuses)[number];
export type AdminRequest = z.infer<typeof requestSchema>;
