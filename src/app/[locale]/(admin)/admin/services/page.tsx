import { getAdminServices } from "@/lib/admin-data";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { deleteServiceAction } from "@/app/cms-actions";

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Service plans</h1>
          <p className="mt-1 text-sm text-white/50">
            Plans rendered on the public services page.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">New plan</Link>
        </Button>
      </div>
      {services.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">
          No service plans yet. Create the first one.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/45">
              <tr>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Id</th>
                <th className="px-4 py-3">Offer</th>
                <th className="px-4 py-3">Savings</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold">{service.name}</td>
                  <td className="px-4 py-3 text-white/50">{service.id}</td>
                  <td className="max-w-[240px] truncate px-4 py-3">
                    {service.offer}
                  </td>
                  <td className="px-4 py-3">
                    {Math.round(service.savingsRate * 100)}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        service.published ? "text-emerald-400" : "text-amber-400"
                      }
                    >
                      {service.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/services/${service.id}`}>Edit</Link>
                      </Button>
                      <ConfirmDeleteButton
                        label="Delete"
                        action={deleteServiceAction}
                      id={service.id}
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
