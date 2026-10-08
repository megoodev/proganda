import { z } from "zod";
import { idSchema, optionalPhone, optionalUrl } from "@/lib/validators";
import { platforms } from "@/features/portfolio/schemas";

export const contractStatuses = ["pending", "contracted"] as const;

// Read model used by the dashboard table
export const bloggerSchema = z.object({
  id: z.string(),
  name: z.string(),
  niche: z.string(),
  platforms: z.array(z.enum(platforms)),
  followers: z.number(),
  status: z.enum(contractStatuses),
});

// Written by the blogger (signup and profile edit). The contract status is NOT here: only admins change it.
export const bloggerProfileInputSchema = z.object({
  name: z.string().min(2).max(120),
  niche: z.string().min(2).max(80),
  platforms: z.array(z.enum(platforms)).min(1),
  handles: z.string().max(300).optional(),
  followers: z.number().int().min(0).default(0),
  monthlyViews: z.string().max(60).optional(),
  phone: optionalPhone,
  governorate: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
  portfolioUrl: optionalUrl,
});

export const setBloggerStatusSchema = idSchema.extend({ status: z.enum(contractStatuses) });
export const bloggerIdSchema = idSchema;

export type Blogger = z.infer<typeof bloggerSchema>;
export type BloggerDetail = Blogger & {
  handles?: string; monthlyViews?: string; phone?: string; governorate?: string; city?: string; portfolioUrl?: string;
};
export type BloggerProfileInput = z.input<typeof bloggerProfileInputSchema>;
export type ContractStatus = (typeof contractStatuses)[number];
