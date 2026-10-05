import { mockCaseStudies } from "../mock-case-studies";

// Phase A: mock. Phase C: Prisma.
export async function getCaseStudies() {
  return mockCaseStudies;
}

export async function getCaseStudy(id: string) {
  return mockCaseStudies.find((item) => item.id === id) ?? null;
}
