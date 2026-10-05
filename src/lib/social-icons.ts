// Single source of truth: these keys are what gets stored in SocialLink.icon (DB)

export const SOCIAL_ICON_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X (Twitter)" },
  { value: "globe", label: "Website" },
] as const;

export type SocialIconKey = (typeof SOCIAL_ICON_OPTIONS)[number]["value"];

export const SOCIAL_ICON_KEYS = SOCIAL_ICON_OPTIONS.map(
  (o) => o.value,
) as [SocialIconKey, ...SocialIconKey[]];

/** Returns a valid key, or "" if the stored value is empty/unknown */
export function normalizeIconKey(value?: string | null): SocialIconKey | "" {
  const v = value?.toLowerCase().trim();
  return SOCIAL_ICON_OPTIONS.some((o) => o.value === v)
    ? (v as SocialIconKey)
    : "";
}

/** Guess a key from the platform name (fallback when icon is empty) */
export function guessIconKey(platform: string): SocialIconKey {
  const p = platform.toLowerCase().trim();
  if (p.includes("instagram")) return "instagram";
  if (p.includes("tiktok")) return "tiktok";
  if (p.includes("whatsapp")) return "whatsapp";
  if (p.includes("facebook")) return "facebook";
  if (p.includes("linkedin")) return "linkedin";
  if (p.includes("youtube")) return "youtube";
  if (p === "x" || p.includes("twitter")) return "x";
  return "globe";
}