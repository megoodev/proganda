import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getAuditLog } from "@/features/audit/queries/get-audit-log";
import { AuditTable } from "./_components/audit-table";

export default async function AuditLogPage() {
  const t = await getTranslations("admin.audit");
  const entries = await getAuditLog();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <AuditTable entries={entries} />
    </>
  );
}
