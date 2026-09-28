import { notFound } from "next/navigation";
import { getAdminCreator } from "@/lib/admin-data";
import { CreatorForm } from "@/components/admin/creator-form";

export default async function EditCreatorPage({
  params,
}: PageProps<"/[locale]/admin/creators/[id]">) {
  const { id } = await params;
  const creator = await getAdminCreator(id);
  if (!creator) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black">Edit creator</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">{creator.name}</p>
      <CreatorForm creator={creator} />
    </div>
  );
}
