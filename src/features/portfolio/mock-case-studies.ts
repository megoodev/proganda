import type { CaseStudy } from "./schemas";

export const mockCaseStudies: CaseStudy[] = [
  {
    id: "c1", brand: "Zad Trips", title: "حملة صيف 2026", goal: "رفع الوعي بالعلامة بين الشباب", summary: "",
    published: true,
    metrics: [
      { platform: "tiktok", views: 3_200_000, reach: 1_900_000, engagement: 210_000 },
      { platform: "instagram", views: 1_100_000, reach: 740_000, engagement: 96_000 },
    ],
  },
  {
    id: "c2", brand: "Bite Burgers", title: "إطلاق منيو جديد", goal: "زيادة الطلبات عبر التطبيق", summary: "",
    published: true,
    metrics: [{ platform: "instagram", views: 860_000, reach: 520_000, engagement: 71_000 }],
  },
  {
    id: "c3", brand: "نور للمجوهرات", title: "كولكشن العيد", goal: "المبيعات الموسمية", summary: "",
    published: false,
    metrics: [{ platform: "youtube", views: 410_000, reach: 300_000, engagement: 24_000 }],
  },
];
