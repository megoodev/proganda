import { mockBrands } from "../mock-brands";

// Phase A: mock. Phase C: Prisma.
export async function getBrands() {
  return mockBrands;
}
