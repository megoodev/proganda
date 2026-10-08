import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listServices } from "@/features/services/queries/list-services";
import { ServicesTable } from "./_components/services-table";

export default async function ServicesPage() {
  const t = await getTranslations("admin.services");
  const services = await listServices();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <ServicesTable initialServices={services} />
    </>
  );
}
