import { notFound } from "next/navigation";
import { getAdminService } from "@/lib/admin-data";
import { ServiceForm } from "@/components/admin/service-form";

export default async function EditServicePage({
  params,
}: PageProps<"/[locale]/admin/services/[id]">) {
  const { id } = await params;
  const service = await getAdminService(id);
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black">Edit service plan</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">{service.name}</p>
      <ServiceForm service={service} />
    </div>
  );
}
