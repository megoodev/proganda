"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteSocialLink(id: string, locale?: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "المعرف غير صالح" };
    }

    // 1. حذف الرابط من قاعدة البيانات
    const result = await prisma.socialLink.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return { success: false, error: "لم يتم العثور على الرابط في قاعدة البيانات" };
    }

    // 2. إعادة ترتيب باقي الروابط
    const remainingLinks = await prisma.socialLink.findMany({
      orderBy: { sortOrder: "asc" },
    });

    await Promise.all(
      remainingLinks.map((link, index) =>
        prisma.socialLink.update({
          where: { id: link.id },
          data: { sortOrder: index },
        })
      )
    );

    // 3. Revalidate متوافق مع الـ i18n
    
    // أ) إذا تمرير اللغة
    if (locale) {
      revalidatePath(`/${locale}/admin/settings`);
      revalidatePath(`/${locale}/contact`);
    }

  
    revalidatePath("/[locale]/admin/settings", "page");
    revalidatePath("/[locale]/contact", "page");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete social link:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "فشل حذف الرابط",
    };
  }
}