import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getSiteSettings } from "@/features/settings/queries/get-site-settings";
import { SettingsForm } from "./_components/settings-form";

export default async function SettingsPage() {
  const t = await getTranslations("admin.settings");
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")} />
      <SettingsForm defaultValues={settings} />
    </div>
  );
}