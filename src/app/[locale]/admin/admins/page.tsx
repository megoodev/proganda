import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listAdmins } from "@/features/admin/queries/list-admins";
import { AdminsTable } from "./_components/admins-table";

export default async function AdminsPage() {
  const t = await getTranslations("admin.admins");
  const admins = await listAdmins();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <AdminsTable initialAdmins={admins} />
    </>
  );
}
