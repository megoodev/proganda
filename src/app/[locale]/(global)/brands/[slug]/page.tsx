import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { brands, type Brand } from "@/lib/data";
import { BrandDetailClient } from "./_components/BrandDetailClient";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) notFound();

  const t = await getTranslations({ locale, namespace: "brands" });
  const tBrandDetail = await getTranslations({
    locale,
    namespace: "brandDetail",
  });
  const translatedBrands = t.raw("brandsList") as Brand[];
  const translatedBrand = translatedBrands.find((item) => item.slug === slug);

  return (
    <BrandDetailClient
      brand={translatedBrand ? { ...brand, ...translatedBrand } : brand}
      t={{
        back: t("back"),
        servicesUsed: t("servicesUsed"),
        cta: t("cta"),
        views: t("views"),
        roi: t("roi"),
        connectDirectly: tBrandDetail("connectDirectly"),
        executionSummary: tBrandDetail("executionSummary"),
        industry: tBrandDetail("industry"),
        production: tBrandDetail("production"),
        channels: tBrandDetail("channels"),
        campaignStatus: tBrandDetail("campaignStatus"),
        completedVerified: tBrandDetail("completedVerified"),
        inHouseProduction: tBrandDetail("inHouseProduction"),
        performanceInsights: tBrandDetail("performanceInsights"),
        keyCampaignImpact: tBrandDetail("keyCampaignImpact"),
        strategicExecution: tBrandDetail("strategicExecution"),
        producedContent: tBrandDetail("producedContent"),
        campaignMediaDeliverables: tBrandDetail("campaignMediaDeliverables"),
        featuredCreators: tBrandDetail("featuredCreators"),
        castCollaborators: tBrandDetail("castCollaborators"),
        readyToLaunch: tBrandDetail("readyToLaunch"),
        readyToLaunchDesc: tBrandDetail("readyToLaunchDesc"),
        platformsList: tBrandDetail("platformsList"),
        directConversions: tBrandDetail("directConversions"),
        engagementRate: tBrandDetail("engagementRate"),
        engagementChange: tBrandDetail("engagementChange"),
        totalReach: tBrandDetail("totalReach"),
        uniqueViewers: tBrandDetail("uniqueViewers"),
        strategyIntro: tBrandDetail("strategyIntro"),
        campaignMedia: tBrandDetail.raw("campaignMedia") as Array<{
          title: string;
          creator: string;
          type: string;
          views: string;
        }>,
        strategyBreakdown: tBrandDetail.raw("strategyBreakdown") as Array<{
          step: string;
          title: string;
          description: string;
        }>,
        creatorCollaborators: tBrandDetail.raw(
          "creatorCollaborators",
        ) as Array<{
          name: string;
          role: string;
          reach: string;
        }>,
      }}
    />
  );
}
