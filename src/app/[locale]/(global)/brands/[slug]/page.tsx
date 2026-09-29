import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { brands } from "@/lib/data";
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

  return (
    <BrandDetailClient
      brand={brand}
      t={{
        back: t("back"),
        servicesUsed: t("servicesUsed"),
        cta: t("cta"),
        views: t("views"),
        roi: t("roi"),
        connectDirectly: t("connectDirectly"),
        executionSummary: t("executionSummary"),
        industry: t("industry"),
        production: t("production"),
        channels: t("channels"),
        campaignStatus: t("campaignStatus"),
        completedVerified: t("completedVerified"),
        inHouseProduction: t("inHouseProduction"),
        performanceInsights: t("performanceInsights"),
        keyCampaignImpact: t("keyCampaignImpact"),
        strategicExecution: t("strategicExecution"),
        producedContent: t("producedContent"),
        campaignMediaDeliverables: t("campaignMediaDeliverables"),
        featuredCreators: t("featuredCreators"),
        castCollaborators: t("castCollaborators"),
        readyToLaunch: t("readyToLaunch"),
        readyToLaunchDesc: t("readyToLaunchDesc"),
        platformsList: t("platformsList"),
      }}
    />
  );
}