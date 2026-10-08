import type { Tone as StatusBadgeTone } from "@/components/shared/status-badge";
import type { Ad, AdStatus, RecordStatus } from "@/features/ads/schemas";

export function getAdStatus(ad: Ad): AdStatus {
  if (!ad.published) return "draft";

  const today = new Date().toISOString().slice(0, 10);

  if (ad.startsAt > today) return "scheduled";
  if (ad.endsAt < today) return "ended";

  return "active";
}

export const adStatusTone: Record<AdStatus | RecordStatus | string, StatusBadgeTone> = {
  draft: "warning",
  scheduled: "secondary",
  active: "success",
  ended: "destructive",
  DRAFT: "warning",
  PUBLISHED: "success",
  ARCHIVED: "destructive",
};