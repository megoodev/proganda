import { redirect } from "@/i18n/navigation";
import { requireStaff } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminGuardLayout({
  children,
  params,
}: LayoutProps<"/[locale]/admin">) {
  const { locale } = await params;
  const staff = await requireStaff();
  if (!staff) {
    redirect({ href: "/auth/login?next=/admin", locale });
    return null;
  }

  return <AdminShell user={staff}>{children}</AdminShell>;
}
