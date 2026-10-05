import type { Blogger } from "./schemas";

export const mockBloggers: Blogger[] = [
  { id: "b1", name: "يوسف الشناوي", niche: "سفر", platforms: ["tiktok", "instagram"], followers: 820_000, status: "contracted" },
  { id: "b2", name: "مريم عصام", niche: "أزياء", platforms: ["instagram"], followers: 460_000, status: "contracted" },
  { id: "b3", name: "عمر خالد", niche: "تقنية", platforms: ["youtube"], followers: 230_000, status: "pending" },
  { id: "b4", name: "هنا طارق", niche: "طعام", platforms: ["tiktok", "facebook"], followers: 150_000, status: "pending" },
  { id: "b5", name: "كريم رضا", niche: "ألعاب", platforms: ["youtube", "tiktok"], followers: 610_000, status: "contracted" },
];
