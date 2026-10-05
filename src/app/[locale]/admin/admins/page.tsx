import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getAdmins } from "@/features/admin/queries/get-admins";
import { AdminsTable } from "./_components/admins-table";

export default async function AdminsPage() {
  const t = await getTranslations("admin.admins");
  const admins = await getAdmins();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <AdminsTable initialAdmins={admins} />
    </>
  );
}
