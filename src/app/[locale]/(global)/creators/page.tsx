import { getTranslations } from "next-intl/server";
import { CreatorsClient } from "./_components/CreatorsClient";

export default async function CreatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "creators" });

  return (
    <CreatorsClient
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      search={t("search")}
      all={t("all")}
      profile={t("profile")}
      reach={t("reach")}
      engagement={t("engagement")}
      creatorNames={t.raw("creatorNames") as Record<string, string>}
      niches={t.raw("niches") as Record<string, string>}
      locations={t.raw("locations") as Record<string, string>}
    />
  );
}
