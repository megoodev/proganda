import { getAdminCreators } from "@/lib/admin-data";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { deleteCreatorAction } from "@/app/cms-actions";

export default async function AdminCreatorsPage() {
  const creators = await getAdminCreators();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Creators</h1>
          <p className="mt-1 text-sm text-white/50">Profiles shown on the public directory.</p>
        </div>
        <Button asChild>
          <Link href="/admin/creators/new">New creator</Link>
        </Button>
      </div>
      {creators.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">
          No creators yet. Add the first profile.
        </p>
      ) : (
      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/45">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Niche</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id} className="border-t border-white/10">
                <td className="px-4 py-3 font-semibold">{creator.name}</td>
                <td className="px-4 py-3 text-white/50">{creator.slug}</td>
                <td className="px-4 py-3">{creator.niche}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      creator.published ? "text-emerald-400" : "text-amber-400"
                    }
                  >
                    {creator.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/creators/${creator.id}`}>Edit</Link>
                    </Button>
                    <ConfirmDeleteButton
                      label="Delete"
                      action={deleteCreatorAction}
                      id={creator.id}
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
