export type HomeStats = { totalViews: number };

// Phase A: mock value. Phase C: sum the CaseStudy metrics from the database.
export async function getHomeStats(): Promise<HomeStats> {
  return { totalViews: 12_400_000_000 };
}
