import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listContracts } from "@/features/contracts/queries/list-contracts";
import { ContractsTable } from "./_components/contracts-table";

export default async function ContractsPage() {
  const t = await getTranslations("admin.contracts");
  const contracts = await listContracts();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <ContractsTable initialContracts={contracts} />
    </>
  );
}
