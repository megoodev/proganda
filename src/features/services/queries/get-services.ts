import { mockServices } from "../mock-services";

// Phase A: mock. Phase C: Prisma.
export async function getServices() {
  return mockServices;
}
