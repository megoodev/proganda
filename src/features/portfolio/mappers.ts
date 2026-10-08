import { lower, upper } from "@/lib/enum";
import type { CaseStudy, CaseStudyInput } from "./schemas";

type MetricRow = { platform: Parameters<typeof lower>[0]; views: bigint; reach: bigint; engagement: bigint };
type CaseStudyRow = {
  id: string; slug: string; brand: string; title: string; goal: string; summary: string | null;
  published: boolean; metrics: MetricRow[];
};

// BigInt -> number is safe up to 9e15
export const toCaseStudy = (row: CaseStudyRow): CaseStudy & { slug: string } => ({
  id: row.id,
  slug: row.slug,
  brand: row.brand,
  title: row.title,
  goal: row.goal,
  summary: row.summary ?? "",
  published: row.published,
  metrics: row.metrics.map((metric) => ({
    platform: lower(metric.platform) as CaseStudy["metrics"][number]["platform"],
    views: Number(metric.views),
    reach: Number(metric.reach),
    engagement: Number(metric.engagement),
  })),
});

export const toMetricData = (metrics: CaseStudyInput["metrics"]) =>
  metrics.map((metric) => ({
    platform: upper(metric.platform),
    views: BigInt(Math.round(metric.views)),
    reach: BigInt(Math.round(metric.reach)),
    engagement: BigInt(Math.round(metric.engagement)),
  }));
