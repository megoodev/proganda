import { z } from "zod";
import { egyptPhone, idSchema, optionalUrl } from "@/lib/validators";

export const brandStatuses = ["pending", "contracted"] as const;

export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  contactName: z.string(),
  contactPhone: z.string(),
  status: z.enum(brandStatuses),
});

// Written by the brand (signup and profile edit). The contract status is changed by admins only.
export const brandProfileInputSchema = z.object({
  name: z.string().min(2).max(120),
  industry: z.string().min(2).max(80),
  contactName: z.string().min(2).max(120),
  contactPhone: z.string().regex(egyptPhone, "Enter a valid Egyptian mobile number"),
  budget: z.string().max(60).optional(),
  goal: z.string().max(200).optional(),
  website: optionalUrl,
});

export const setBrandStatusSchema = idSchema.extend({ status: z.enum(brandStatuses) });
export const brandIdSchema = idSchema;

export type Brand = z.infer<typeof brandSchema>;
export type BrandDetail = Brand & { budget?: string; goal?: string; website?: string };
export type BrandStatus = (typeof brandStatuses)[number];
