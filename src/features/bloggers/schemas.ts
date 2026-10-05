import { z } from "zod";
import { platforms } from "@/features/portfolio/schemas";

export const contractStatuses = ["pending", "contracted"] as const;

export const bloggerSchema = z.object({
  id: z.string(),
  name: z.string(),
  niche: z.string(),
  platforms: z.array(z.enum(platforms)),
  followers: z.number(),
  status: z.enum(contractStatuses),
});

export type Blogger = z.infer<typeof bloggerSchema>;
export type ContractStatus = (typeof contractStatuses)[number];
