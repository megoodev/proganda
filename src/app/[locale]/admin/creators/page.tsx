import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getShowcaseCreators } from "@/features/creators/queries/get-showcase-creators";
import { CreatorsTable } from "./_components/creators-table";

export default async function AdminCreatorsPage() {
  const t = await getTranslations("admin.creators");
  const creators = await getShowcaseCreators();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <CreatorsTable initialCreators={creators} />
    </>
  );
}
