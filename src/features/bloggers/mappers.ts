import { lower, upper } from "@/lib/enum";
import type { Blogger, BloggerDetail, BloggerProfileInput } from "./schemas";
import type { z } from "zod";
import type { bloggerProfileInputSchema } from "./schemas";

type Row = {
  id: string; name: string; niche: string; platforms: Parameters<typeof lower>[0][]; followers: number;
  status: Parameters<typeof lower>[0]; handles: string | null; monthlyViews: string | null; phone: string | null;
  governorate: string | null; city: string | null; portfolioUrl: string | null;
};

export const toBlogger = (row: Row): Blogger => ({
  id: row.id,
  name: row.name,
  niche: row.niche,
  platforms: row.platforms.map((platform) => lower(platform)) as Blogger["platforms"],
  followers: row.followers,
  status: lower(row.status) as Blogger["status"],
});

export const toBloggerDetail = (row: Row): BloggerDetail => ({
  ...toBlogger(row),
  handles: row.handles ?? undefined,
  monthlyViews: row.monthlyViews ?? undefined,
  phone: row.phone ?? undefined,
  governorate: row.governorate ?? undefined,
  city: row.city ?? undefined,
  portfolioUrl: row.portfolioUrl ?? undefined,
});

// Empty strings become null so optional columns stay clean
const blank = (value?: string) => value?.trim() || null;

export const toBloggerData = (input: z.output<typeof bloggerProfileInputSchema> | BloggerProfileInput) => ({
  name: input.name,
  niche: input.niche,
  platforms: input.platforms.map((platform) => upper(platform)),
  handles: blank(input.handles),
  followers: input.followers ?? 0,
  monthlyViews: blank(input.monthlyViews),
  phone: blank(input.phone),
  governorate: blank(input.governorate),
  city: blank(input.city),
  portfolioUrl: blank(input.portfolioUrl),
});
