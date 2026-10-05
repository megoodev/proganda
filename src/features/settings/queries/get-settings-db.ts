import { prisma  } from "@/lib/prisma"; // أو "@/lib/prisma" حسب اسم الملف لديك
import { type SiteSettings } from "../schemas";

export async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        socialLinks: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!settings) {
      return {
        siteName: "ProGanda",
        whatsapp: "",
        email: "",
        phone: "",
        socialLinks: [],
      };
    }

    return {
      siteName: settings.siteName ?? "ProGanda",
      whatsapp: settings.whatsapp ?? "",
      email: settings.email ?? "",
      phone: settings.phone ?? undefined,
      socialLinks: settings.socialLinks.map((link) => ({
        platform: link.platform,
        title: link.title ?? undefined, // تحويل null إلى undefined ليتوافق مع Zod/Typescript
        url: link.url,
        icon: link.icon ?? undefined,
        sortOrder: link.sortOrder,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {
      siteName: "ProGanda",
      whatsapp: "",
      email: "",
      phone: "",
      socialLinks: [],
    };
  }
}