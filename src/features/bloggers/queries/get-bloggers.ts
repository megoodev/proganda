import { mockBloggers } from "../mock-bloggers";

// Phase A: mock. Phase C: Prisma.
export async function getBloggers() {
  return mockBloggers;
}
