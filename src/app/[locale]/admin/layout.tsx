import { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminRoleProvider } from "@/features/admin/admin-role-context";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";
import { AdminContainer } from "./_components/AdminContainer";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const locale = await getLocale();

  const t = await getTranslations({ locale, namespace: "common" });
  const alternate = locale === "en" ? "ar" : "en";
  const side = locale === "ar" ? "right" : "left";

  return (
    <AdminRoleProvider>
      <SidebarProvider defaultOpen>
        <div className="relative flex min-h-screen w-full bg-muted/40 text-foreground">
          <AdminSidebar />

          <SidebarInset className="flex min-h-screen flex-1 flex-col bg-transparent transition-all duration-300">
            <AdminHeader locale={locale as "ar" | "en"} label={t("language")} />

            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <AdminContainer>{children}</AdminContainer>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AdminRoleProvider>
  );
}
