import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getContracts } from "@/features/contracts/queries/get-contracts";
import { ContractsTable } from "./_components/contracts-table";

export default async function ContractsPage() {
  const t = await getTranslations("admin.contracts");
  const contracts = await getContracts();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <ContractsTable initialContracts={contracts} />
    </>
  );
}
