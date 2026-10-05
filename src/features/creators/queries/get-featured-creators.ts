import { creators } from "@/lib/data";

// Phase A: reads the mock list. Phase C: replace the body with Prisma.
export async function getFeaturedCreators() {
  return creators;
}
