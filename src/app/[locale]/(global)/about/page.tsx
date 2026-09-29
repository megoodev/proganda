import { getTranslations } from "next-intl/server";
import { AboutClientContent } from "./_components/AboutClientContent";

interface PageProps<T extends string = string> {
  params: Promise<{
    locale: "ar" | "en";
  }>;
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const timelineItems = (t.raw("timelineItems") as string[]) || [];

  const metricsData: Array<[string, string]> = [
    ["18+", t("campaigns")],
    ["54M", t("impressions")],
    ["11.8%", t("engagement")],
    ["4.8x", t("roi")],
  ];

  const translatedTexts = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    capabilityMeta: t("capabilityMeta"),
    metrics: t("metrics"),
    studio: t("studio"),
    studioDescription: t("studioDescription"),
    timeline: t("timeline"),
  };

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300 py-10">
      <AboutClientContent
        t={translatedTexts}
        metricsData={metricsData}
        timelineItems={timelineItems}
      />
    </main>
  );
}