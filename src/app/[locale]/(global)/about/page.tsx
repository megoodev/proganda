import { getTranslations } from "next-intl/server";
import { AboutClientContent } from "./_components/AboutClientContent";
import type { AboutMetric } from "./_components/about-types";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const timelineItems = (t.raw("timelineItems") as string[]) || [];
  const capabilityLabels = (t.raw("capabilities") as string[]) || [];

  const metricsData: AboutMetric[] = [
    { value: "18+", label: t("campaigns") },
    { value: "54M", label: t("impressions") },
    { value: "11.8%", label: t("engagement") },
    { value: "4.8x", label: t("roi") },
  ];

  const copy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    capabilityMeta: t("capabilityMeta"),
    trackingLive: t("trackingLive"),
    creatorManaged: t("creatorManaged"),
    averageRoi: t("averageRoi"),
    growth: t("growth"),
    activeReach: t("activeReach"),
    viewsCount: t("viewsCount"),
    contentEngine: t("contentEngine"),
    metrics: t("metrics"),
    studio: t("studio"),
    studioDescription: t("studioDescription"),
    timeline: t("timeline"),
    timelineLive: t("timelineLive"),
    timelineDescription: t("timelineDescription"),
    inHousePipeline: t("inHousePipeline"),
  };

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300 py-10">
      <AboutClientContent
        copy={copy}
        metricsData={metricsData}
        capabilityLabels={capabilityLabels}
        timelineItems={timelineItems}
      />
    </main>
  );
}
