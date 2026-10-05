import type { Tone } from "@/components/shared/status-badge";
import type { AdInput } from "./schemas";

export type AdStatus = "draft" | "scheduled" | "active" | "ended";

export function getAdStatus(ad: Pick<AdInput, "published" | "startsAt" | "endsAt">, now = new Date()): AdStatus {
  if (!ad.published) return "draft";
  const today = now.toISOString().slice(0, 10);
  if (today < ad.startsAt) return "scheduled";
  if (today > ad.endsAt) return "ended";
  return "active";
}

export const adStatusTone: Record<AdStatus, Tone> = {
  draft: "neutral",
  scheduled: "info",
  active: "success",
  ended: "warning",
};
