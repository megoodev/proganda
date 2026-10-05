import { mockShowcase } from "../mock-showcase";

// Phase A: mock. Phase C: Prisma.
export async function getShowcaseCreators() {
  return mockShowcase;
}
