import type { SiteSettings } from "./schemas";

export const mockSettings: SiteSettings = {
  siteName: "ProGanda",
  whatsapp: "+201001234567",
  email: "hello@example.com",
  socialLinks: [
    {
      id: "1",
      platform: "instagram",
      title: "Instagram",
      url: "https://instagram.com/proganda",
      icon: "instagram",
      sortOrder: 0,
    },
    {
      id: "2",
      platform: "tiktok",
      title: "TikTok",
      url: "https://tiktok.com/@proganda",
      icon: "tiktok",
      sortOrder: 1,
    },
    {
      id: "3",
      platform: "youtube",
      title: "YouTube",
      url: "https://youtube.com/@proganda",
      icon: "youtube",
      sortOrder: 2,
    },
    {
      id: "4",
      platform: "facebook",
      title: "Facebook",
      url: "https://facebook.com/proganda",
      icon: "facebook",
      sortOrder: 3,
    },
  ],
};
