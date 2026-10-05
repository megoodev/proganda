import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getAds } from "@/features/ads/queries/get-ads";
import { AdsTable } from "./_components/ads-table";

export default async function AdsPage() {
  const t = await getTranslations("admin.ads");
  const ads = await getAds();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <AdsTable initialAds={ads} />
    </>
  );
}
