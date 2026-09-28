import { notFound } from "next/navigation";
import { getAdminBrand } from "@/lib/admin-data";
import { BrandForm } from "@/components/admin/brand-form";

export default async function EditBrandPage({
  params,
}: PageProps<"/[locale]/admin/brands/[id]">) {
  const { id } = await params;
  const brand = await getAdminBrand(id);
  if (!brand) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black">Edit brand</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">{brand.name}</p>
      <BrandForm brand={brand} />
    </div>
  );
}
