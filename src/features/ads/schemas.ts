import { z } from "zod";

export const adPlacements = ["home", "offers"] as const;
export const adSources = ["company", "brand"] as const;

export const adSchema = z
  .object({
    title: z.string().min(2),
    body: z.string().min(5),
    placement: z.enum(adPlacements),
    source: z.enum(adSources), // company = created for the team, brand = paid ad for a brand
    brandName: z.string().optional(),
    startsAt: z.string().min(1), // yyyy-mm-dd
    endsAt: z.string().min(1),
    published: z.boolean(),
  })
  .refine((ad) => ad.endsAt >= ad.startsAt, { path: ["endsAt"], message: "End date must be after the start date" })
  .refine((ad) => ad.source !== "brand" || !!ad.brandName?.trim(), { path: ["brandName"], message: "Brand name is required" });

export type AdInput = z.infer<typeof adSchema>;
export type Ad = AdInput & { id: string };
