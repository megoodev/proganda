import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { PortfolioForm } from "../_components/portfolio-form";

export default async function NewCaseStudyPage() {
  const t = await getTranslations("admin.portfolio");

  return (
    <>
      <PageHeader title={t("newTitle")} />
      <PortfolioForm />
    </>
  );
}
