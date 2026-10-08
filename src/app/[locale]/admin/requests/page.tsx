import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listAssignableAdmins } from "@/features/admin/queries/get-admin";
import { listRequests } from "@/features/requests/queries/list-requests";
import { RequestsTable } from "./_components/requests-table";

export default async function RequestsPage() {
  const t = await getTranslations("admin.requests");
  const [requests, admins] = await Promise.all([listRequests(), listAssignableAdmins()]);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <RequestsTable initialRequests={requests} admins={admins} />
    </>
  );
}
