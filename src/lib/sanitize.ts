const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function assertSlug(value: string) {
  const slug = slugify(value);
  if (!slug || !SLUG_PATTERN.test(slug)) {
    throw new Error("Use a URL-safe slug (lowercase letters, numbers, hyphens).");
  }
  return slug;
}

export function assertSafeHttpUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Enter a valid http(s) URL.");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Only http and https URLs are allowed.");
  }
  return parsed.toString();
}

export function assertHexColor(value: string) {
  const color = value.trim();
  if (!COLOR_PATTERN.test(color)) {
    throw new Error("Use a hex color like #3AA7FD.");
  }
  return color;
}

export function splitList(value: string, fallback: string[] = []) {
  const items = value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 24);
  return items.length ? items : fallback;
}

export function safeNextPath(next: string | null | undefined, fallback = "/") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return fallback;
  }
  return next;
}
