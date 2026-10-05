import { mockAdmins } from "../mock-admins";

// Phase A: mock. Phase C: Prisma.
export async function getAdmins() {
  return mockAdmins;
}
