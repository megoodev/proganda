import { z } from "zod";
import { requestSchema } from "../schemas";
import { mockRequests } from "../mock-requests";

// Phase A: reads mock data. Phase C: replace the body with Prisma (keep the signature).
export async function getRequests() {
  return z.array(requestSchema).parse(mockRequests);
}
