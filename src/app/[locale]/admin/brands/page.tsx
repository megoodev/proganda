import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listBrands } from "@/features/brands/queries/list-brands";
import { BrandsTable } from "./_components/brands-table";

export default async function BrandsPage() {
  const t = await getTranslations("admin.brands");
  const brands = await listBrands();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <BrandsTable initialBrands={brands} />
    </>
  );
}
