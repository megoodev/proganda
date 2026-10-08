import { z } from "zod";
import { idSchema } from "@/lib/validators";

export const platforms = ["instagram", "tiktok", "youtube", "facebook", "snapchat"] as const;
export type Platform = (typeof platforms)[number];

export const metricSchema = z.object({
  platform: z.enum(platforms),
  views: z.number().min(0),
  reach: z.number().min(0),
  engagement: z.number().min(0),
});

export const caseStudyBaseSchema = z.object({
  brand: z.string().min(2),
  title: z.string().min(2),
  goal: z.string().min(2),
  summary: z.string().optional(),
  published: z.boolean(),
  metrics: z.array(metricSchema).min(1),
});

type Shape = z.infer<typeof caseStudyBaseSchema>;
const uniquePlatforms = (data: Shape) => new Set(data.metrics.map((metric) => metric.platform)).size === data.metrics.length;
const uniqueRule = { path: ["metrics"], message: "Each platform can appear once" };

// Used by the form and by the Server Actions.
export const caseStudySchema = caseStudyBaseSchema.refine(uniquePlatforms, uniqueRule);
export const caseStudyUpdateSchema = caseStudyBaseSchema.extend({ id: z.string().min(1) }).refine(uniquePlatforms, uniqueRule);
export const caseStudyIdSchema = idSchema;
export const setPublishedSchema = idSchema.extend({ published: z.boolean() });

export type CaseStudyInput = z.infer<typeof caseStudySchema>;
export type CaseStudy = CaseStudyInput & { id: string };
