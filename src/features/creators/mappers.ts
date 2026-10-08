import type { ShowcaseCreator } from "./schemas";

type Row = { id: string; name: string; niche: string; reach: string; image: string; accent: string | null; published: boolean };

export const toShowcaseCreator = (row: Row): ShowcaseCreator => ({
  id: row.id,
  name: row.name,
  niche: row.niche,
  reach: row.reach,
  image: row.image,
  accent: row.accent ?? undefined,
  published: row.published,
});
