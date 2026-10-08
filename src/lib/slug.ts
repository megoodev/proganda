export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-") // keeps Arabic letters
    .replace(/^-+|-+$/g, "");

/** `isTaken` should return true when the slug already exists. */
export async function uniqueSlug(base: string, isTaken: (slug: string) => Promise<boolean>) {
  const root = slugify(base) || "item";
  let slug = root;
  for (let i = 2; await isTaken(slug); i++) slug = `${root}-${i}`;
  return slug;
}
