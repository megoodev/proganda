import { lower, upper } from "@/lib/enum";
import type { Ad, AdInput } from "./schemas";

type AdRow = {
  id: string; title: string; body: string; placement: Parameters<typeof lower>[0]; source: Parameters<typeof lower>[0];
  brandName: string | null; startsAt: Date; endsAt: Date; published: boolean;
};

const day = (date: Date) => date.toISOString().slice(0, 10);

export const toAd = (row: AdRow): Ad => ({
  id: row.id,
  title: row.title,
  body: row.body,
  placement: lower(row.placement) as Ad["placement"],
  source: lower(row.source) as Ad["source"],
  brandName: row.brandName ?? undefined,
  startsAt: day(row.startsAt),
  endsAt: day(row.endsAt),
  published: row.published,
});

// @db.Date columns: store the calendar day at UTC midnight
export const toAdData = (input: AdInput) => ({
  title: input.title,
  body: input.body,
  placement: upper(input.placement),
  source: upper(input.source),
  brandName: input.source === "brand" ? input.brandName?.trim() || null : null,
  startsAt: new Date(`${input.startsAt}T00:00:00.000Z`),
  endsAt: new Date(`${input.endsAt}T00:00:00.000Z`),
  published: input.published,
});
