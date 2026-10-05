import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getCaseStudy } from "@/features/portfolio/queries/get-case-studies";
import { PortfolioForm } from "../../_components/portfolio-form";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = await getCaseStudy(id);
  if (!caseStudy) notFound();

  const t = await getTranslations("admin.portfolio");

  return (
    <>
      <PageHeader title={t("editTitle")} />
      <PortfolioForm defaultValues={caseStudy} />
    </>
  );
}
