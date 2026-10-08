import { z } from "zod";
import { idSchema } from "@/lib/validators";

export const recordStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export type RecordStatus = z.infer<typeof recordStatusEnum>;

export const adStatusEnum = z.enum(["draft", "scheduled", "active", "ended"]);
export type AdStatus = z.infer<typeof adStatusEnum>;

export const adPlacements = ["home", "offers"] as const;
export const adSources = ["company", "brand"] as const;

export const adBaseSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(5),
  placement: z.enum(adPlacements),
  source: z.enum(adSources),
  brandName: z.string().optional(),
  startsAt: z.string().min(1),
  endsAt: z.string().min(1),
  published: z.boolean(),
});

type AdShape = z.infer<typeof adBaseSchema>;
const datesOk = (ad: AdShape) => ad.endsAt >= ad.startsAt;
const brandOk = (ad: AdShape) => ad.source !== "brand" || !!ad.brandName?.trim();

export const adSchema = adBaseSchema
  .refine(datesOk, { path: ["endsAt"], message: "End date must be after the start date" })
  .refine(brandOk, { path: ["brandName"], message: "Brand name is required" });

export const adUpdateSchema = adBaseSchema
  .extend({ id: z.string().min(1) })
  .refine(datesOk, { path: ["endsAt"], message: "End date must be after the start date" })
  .refine(brandOk, { path: ["brandName"], message: "Brand name is required" });

export const adIdSchema = idSchema;
export const activeAdsSchema = z.object({ placement: z.enum(adPlacements).optional() });

export type AdInput = z.infer<typeof adSchema>;
export type Ad = AdInput & { id: string };