import { getTranslations } from "next-intl/server";
import ServicesClient from "./_components/ServicesClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <ServicesClient
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      brandsBoxTitle={t("brandsBoxTitle")}
      brandsBoxSubtitle={t("brandsBoxSubtitle")}
      brandServices={t.raw("brandServices")}
      brandCta={t("brandCta")}
      creatorsBoxTitle={t("creatorsBoxTitle")}
      creatorsBoxSubtitle={t("creatorsBoxSubtitle")}
      creatorServices={t.raw("creatorServices")}
      creatorCta={t("creatorCta")}
      scopeTitle={t("scopeTitle")}
      scopeDescription={t("scopeDescription")}
      consultation={t("consultation")}
      stats={t.raw("stats")}
      workflowSteps={t.raw("workflowSteps")}
      howWeWork={t("howWeWork")}
      journeyTitle={t("journeyTitle")}
    />
  );
}