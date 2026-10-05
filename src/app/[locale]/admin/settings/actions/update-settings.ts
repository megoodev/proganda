"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(data: {
  siteName?: string;
  email: string;
  whatsapp: string;
  phone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    title?: string;
    icon?: string;
    sortOrder?: number;
  }>;
}) {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // إنشاء السجل الرئيسي أولاً لضمان وجود id قبل ربط العلاقات
      settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName ?? "Proganda Studio",
          email: data.email,
          whatsapp: data.whatsapp,
          phone: data.phone ?? null,
          address: data.address ?? null,
        },
      });
    } else {
      // تحديث السجل الرئيسي
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: data.siteName ?? settings.siteName,
          email: data.email,
          whatsapp: data.whatsapp,
          phone: data.phone ?? null,
          address: data.address ?? null,
        },
      });
    }

    // تحديث روابط التواصل المرتبطة بنفس الـ ID
    if (data.socialLinks) {
      await prisma.socialLink.deleteMany({
        where: { siteSettingsId: settings.id },
      });

      if (data.socialLinks.length > 0) {
        await prisma.socialLink.createMany({
          data: data.socialLinks.map((link, index) => ({
            siteSettingsId: settings.id,
            platform: link.platform,
            url: link.url,
            title: link.title ?? link.platform,
            icon: link.icon ?? null,
            sortOrder: link.sortOrder ?? index,
          })),
        });
      }
    }

    revalidatePath("/[locale]/contact", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}