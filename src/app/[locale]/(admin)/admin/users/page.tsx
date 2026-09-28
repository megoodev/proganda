import { getAdminUsers } from "@/lib/admin-data";
import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth";
import { UsersTable, type UserRow } from "@/components/admin/users-table";

export default async function AdminUsersPage({
  params,
}: PageProps<"/[locale]/admin/users">) {
  const { locale } = await params;
  const admin = await requireAdmin();
  if (!admin) {
    redirect({ href: "/admin", locale });
    return null;
  }

  const users = await getAdminUsers();

  const rows: UserRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ?? "brand",
    banned: user.banned ?? false,
    isSelf: user.id === admin.id,
    createdAtLabel: new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
    }).format(user.createdAt),
  }));

  return (
    <div>
      <h1 className="text-3xl font-black">Users</h1>
      <p className="mt-1 text-sm text-white/50">
        {rows.length} accounts. Staff roles unlock the CMS; admin unlocks user
        management.
      </p>
      <div className="mt-8">
        <UsersTable rows={rows} />
      </div>
    </div>
  );
}
