import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { getCaseStudies } from "@/features/portfolio/queries/get-case-studies";
import { PortfolioTable } from "./_components/portfolio-table";

export default async function AdminPortfolioPage() {
  const t = await getTranslations("admin.portfolio");
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        action={
          <Button asChild>
            <Link href="/admin/portfolio/new">
              <Plus className="size-4" />
              {t("new")}
            </Link>
          </Button>
        }
      />
      <PortfolioTable caseStudies={caseStudies} />
    </>
  );
}
