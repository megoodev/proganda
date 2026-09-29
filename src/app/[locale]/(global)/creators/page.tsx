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
    />
  );
}