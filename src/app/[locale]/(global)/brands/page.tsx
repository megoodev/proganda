import { getTranslations } from "next-intl/server";
import { BrandsClient } from "./_components/BrandsClient";

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });

  return (
    <BrandsClient
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      all={t("all")}
      caseStudy={t("caseStudy")}
      views={t("views")}
      roi={t("roi")}
      featuredEyebrow={t("featuredEyebrow")}
      featuredTitle={t("featuredTitle")}
      featuredBrandCampaigns={t.raw("featuredBrandCampaigns")}
      translatedBrands={t.raw("brandsList")}
    />
  );
}