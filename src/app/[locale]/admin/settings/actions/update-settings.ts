"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface SocialLinkInput {
  id?: string;
  platform: string;
  url: string;
  title?: string;
  icon?: string;
  sortOrder?: number;
}

export interface SiteSettingsInput {
  siteName?: string;
  email: string;
  whatsapp: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLinkInput[];
}

export async function updateSiteSettings(data: SiteSettingsInput) {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // 1. إنشاء السجل الرئيسي في حال عدم وجوده
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
      // 2. تحديث السجل الرئيسي بالإعدادات الجديدة
      settings = await prisma.siteSettings.update({
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

    // 3. تحديث أو إضافة الروابط الاجتماعية
    if (data.socialLinks) {
      // حذف الروابط الحالية وإعادة إنشائها لضمان المطابقة الكاملة
      await prisma.socialLink.deleteMany({
        where: { siteSettingsId: settings.id },
      });

      if (data.socialLinks.length > 0) {
        await prisma.socialLink.createMany({
          data: data.socialLinks.map((link, index) => ({
            siteSettingsId: settings.id,
            platform: link.platform,
            url: link.url,
            title: link.title || link.platform,
            icon: link.icon || null,
            sortOrder: link.sortOrder ?? index,
          })),
        });
      }
    }

    // 4. تحديث الكاش لجميع الصفحات التي تعرض هذه البيانات (مهم جداً!)
    revalidatePath("/[locale]/admin/settings", "page");
    revalidatePath("/[locale]/contact", "page");
    revalidatePath("/", "layout"); // لتحديث البيانات في الهيدر والفوتر إن وجدت

    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}