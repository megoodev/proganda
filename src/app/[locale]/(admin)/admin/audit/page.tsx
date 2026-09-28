import { getAdminAudit } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 100;

const ACTION_STYLES: Record<string, string> = {
  create: "text-emerald-400",
  update: "text-[#3AA7FD]",
  upsert: "text-[#3AA7FD]",
  "set-role": "text-purple-400",
  delete: "text-red-400",
  ban: "text-red-400",
  unban: "text-emerald-400",
};

export default async function AdminAuditPage({
  params,
}: PageProps<"/[locale]/admin/audit">) {
  const { locale } = await params;
  const admin = await requireAdmin();
  if (!admin) {
    redirect({ href: "/admin", locale });
    return null;
  }

  const entries = await getAdminAudit(PAGE_SIZE);

  return (
    <div>
      <h1 className="text-3xl font-black">Audit log</h1>
      <p className="mt-1 text-sm text-white/50">
        Latest {PAGE_SIZE} staff actions, newest first.
      </p>
      {entries.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">No activity recorded yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/45">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t border-white/10">
                  <td className="whitespace-nowrap px-4 py-3 text-white/50">
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(entry.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{entry.actorEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={ACTION_STYLES[entry.action] ?? "text-white/70"}
                    >
                      {entry.action}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {entry.entity}
                    {entry.entityId ? (
                      <span className="ml-1 text-xs text-white/35">
                        {entry.entityId.slice(0, 12)}
                      </span>
                    ) : null}
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
