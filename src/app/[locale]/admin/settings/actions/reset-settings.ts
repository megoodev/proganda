"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma"; // اضبط المسار حسب مشروعك

export async function resetSettings() {
  try {
    // القيم الافتراضية
    const DEFAULT_SETTINGS = {
      siteName: "ProGanda Studio",
      whatsapp: "+20000000000",
      phone: "+20000000000",
      email: "demo@email.co",
    };

    const existingSettings = await prisma.siteSettings.findFirst();

    if (existingSettings) {
      await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: DEFAULT_SETTINGS,
      });
    } else {
      await prisma.siteSettings.create({
        data: DEFAULT_SETTINGS,
      });
    }

    // تحديث الكاش وإعادة توجيه البيانات
    revalidatePath("/admin/settings");
    revalidatePath("/contact");

    return {
      success: true,
      data: DEFAULT_SETTINGS,
    };
  } catch (error) {
    console.error("Failed to reset settings:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "فشلت عملية إعادة الضبط",
    };
  }
}