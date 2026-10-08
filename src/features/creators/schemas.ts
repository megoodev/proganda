import { z } from "zod";
import { idSchema } from "@/lib/validators";

// Creators shown on the public site (a curated subset of contracted bloggers).
export const showcaseCreatorSchema = z.object({
  name: z.string().min(2),
  niche: z.string().min(2),
  reach: z.string().min(1), // display value, e.g. "1.2M"
  image: z.string().min(1),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #3AA7FD").optional(),
  published: z.boolean(),
});

export const showcaseCreatorUpdateSchema = showcaseCreatorSchema.extend({ id: z.string().min(1) });
export const showcaseCreatorIdSchema = idSchema;

export type ShowcaseCreatorInput = z.infer<typeof showcaseCreatorSchema>;
export type ShowcaseCreator = ShowcaseCreatorInput & { id: string };
