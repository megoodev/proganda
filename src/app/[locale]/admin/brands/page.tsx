import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getBrands } from "@/features/brands/queries/get-brands";
import { BrandsTable } from "./_components/brands-table";

export default async function BrandsPage() {
  const t = await getTranslations("admin.brands");
  const brands = await getBrands();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <BrandsTable initialBrands={brands} />
    </>
  );
}
