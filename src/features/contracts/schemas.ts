import { z } from "zod";

export const contractPartyTypes = ["blogger", "brand"] as const;
export const contractStatuses = ["pending", "approved", "rejected"] as const;

export const contractRequestSchema = z.object({
  id: z.string(),
  party: z.string(),
  partyType: z.enum(contractPartyTypes),
  status: z.enum(contractStatuses),
  notes: z.string(), // visible to admins only
  createdAt: z.string(),
});

export const contractReviewSchema = z.object({
  status: z.enum(contractStatuses),
  notes: z.string(),
});

export type ContractRequest = z.infer<typeof contractRequestSchema>;
export type ContractReviewInput = z.infer<typeof contractReviewSchema>;
export type ContractStatus = (typeof contractStatuses)[number];
