import { z } from "zod";

export const platforms = ["instagram", "tiktok", "youtube", "facebook", "snapchat"] as const;
export type Platform = (typeof platforms)[number];

export const metricSchema = z.object({
  platform: z.enum(platforms),
  views: z.number().min(0),
  reach: z.number().min(0),
  engagement: z.number().min(0),
});

// Used by the form and (in phase C) by the Server Actions.
export const caseStudySchema = z.object({
  brand: z.string().min(2),
  title: z.string().min(2),
  goal: z.string().min(2),
  summary: z.string().optional(),
  published: z.boolean(),
  metrics: z.array(metricSchema).min(1),
});

export type CaseStudyInput = z.infer<typeof caseStudySchema>;
export type CaseStudy = CaseStudyInput & { id: string };
