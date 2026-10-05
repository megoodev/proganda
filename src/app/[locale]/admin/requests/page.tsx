import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { mockAdmins } from "@/features/admin/mock-admins";
import { getRequests } from "@/features/requests/queries/get-requests";
import { RequestsTable } from "./_components/requests-table";

export default async function RequestsPage() {
  const t = await getTranslations("admin.requests");
  const requests = await getRequests();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <RequestsTable initialRequests={requests} admins={mockAdmins} />
    </>
  );
}
