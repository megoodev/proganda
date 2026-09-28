import { getAdminBrands } from "@/lib/admin-data";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { deleteBrandAction } from "@/app/cms-actions";

export default async function AdminBrandsPage() {
  const brands = await getAdminBrands();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Brands</h1>
          <p className="mt-1 text-sm text-white/50">
            Case studies shown on the public portfolio.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/brands/new">New brand</Link>
        </Button>
      </div>
      {brands.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">
          No brands yet. Create the first case study.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/45">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold">
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: brand.color }}
                      />
                      {brand.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/50">{brand.slug}</td>
                  <td className="px-4 py-3">{brand.industry}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        brand.published
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }
                    >
                      {brand.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/brands/${brand.id}`}>Edit</Link>
                      </Button>
                      <ConfirmDeleteButton
                        label="Delete"
                        action={deleteBrandAction}
                      id={brand.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
