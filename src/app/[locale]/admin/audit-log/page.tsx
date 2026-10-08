import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listAuditLog } from "@/features/audit/queries/list-audit-log";
import { AuditTable } from "./_components/audit-table";

export default async function AuditLogPage() {
  const t = await getTranslations("admin.audit");
  const { items } = await listAuditLog();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <AuditTable entries={items} />
    </>
  );
}
