import { z } from "zod";

// Creators shown on the public site (a curated subset of contracted bloggers).
export const showcaseCreatorSchema = z.object({
  name: z.string().min(2),
  niche: z.string().min(2),
  reach: z.string().min(1), // display value, e.g. "1.2M"
  image: z.string().min(1),
  published: z.boolean(),
});

export type ShowcaseCreatorInput = z.infer<typeof showcaseCreatorSchema>;
export type ShowcaseCreator = ShowcaseCreatorInput & { id: string };
