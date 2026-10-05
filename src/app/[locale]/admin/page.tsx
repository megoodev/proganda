import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { OverviewStats } from "./_components/overview-stats";
import { RecentRequests } from "./_components/recent-requests";
import { PendingContracts } from "./_components/pending-contracts";

export default async function AdminOverviewPage() {
  const t = await getTranslations("admin.overview");

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <div className="space-y-6">
        <OverviewStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentRequests />
          <PendingContracts />
        </div>
      </div>
    </>
  );
}
