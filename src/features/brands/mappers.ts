import type { z } from "zod";
import { lower } from "@/lib/enum";
import type { Brand, BrandDetail, brandProfileInputSchema } from "./schemas";

type Row = {
  id: string; name: string; industry: string; contactName: string; contactPhone: string;
  status: Parameters<typeof lower>[0]; budget: string | null; goal: string | null; website: string | null;
};

export const toBrand = (row: Row): Brand => ({
  id: row.id,
  name: row.name,
  industry: row.industry,
  contactName: row.contactName,
  contactPhone: row.contactPhone,
  status: lower(row.status) as Brand["status"],
});

export const toBrandDetail = (row: Row): BrandDetail => ({
  ...toBrand(row),
  budget: row.budget ?? undefined,
  goal: row.goal ?? undefined,
  website: row.website ?? undefined,
});

const blank = (value?: string) => value?.trim() || null;

export const toBrandData = (input: z.output<typeof brandProfileInputSchema>) => ({
  name: input.name,
  industry: input.industry,
  contactName: input.contactName,
  contactPhone: input.contactPhone,
  budget: blank(input.budget),
  goal: blank(input.goal),
  website: blank(input.website),
});
