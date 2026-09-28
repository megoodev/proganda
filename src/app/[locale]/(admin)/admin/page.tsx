import { getAdminAudit, getAdminBrands, getAdminCreators, getAdminInquiries, getAdminServices, getAdminUsers } from "@/lib/admin-data";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ClipboardList,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

export default async function AdminHomePage() {
  const [creators, brands, services, inquiries, users, auditEntries] =
    await Promise.all([
      getAdminCreators(),
      getAdminBrands(),
      getAdminServices(),
      getAdminInquiries(),
      getAdminUsers(),
      getAdminAudit(6),
    ]);
  const newInquiries = inquiries.filter((row) => row.status === "new").length;
  const totalInquiries = inquiries.length;

  const stats = [
    {
      label: "Creators",
      value: creators.length,
      href: "/admin/creators",
      icon: Sparkles,
      highlight: false,
    },
    {
      label: "Brands",
      value: brands.length,
      href: "/admin/brands",
      icon: Building2,
      highlight: false,
    },
    {
      label: "Service plans",
      value: services.length,
      href: "/admin/services",
      icon: Wallet,
      highlight: false,
    },
    {
      label: "New inquiries",
      value: newInquiries,
      href: "/admin/inquiries",
      icon: ClipboardList,
      highlight: newInquiries > 0,
    },
    {
      label: "Users",
      value: users.length,
      href: "/admin/users",
      icon: Users,
      highlight: false,
    },
  ];

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
        CMS
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        Manage published creators, brand case studies, service plans, and inbound
        inquiries. All writes are staff-only and recorded in the audit log.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card
                className={
                  stat.highlight
                    ? "border-[#3AA7FD]/50 bg-[#171717] transition hover:border-[#3AA7FD]"
                    : "border-white/10 bg-[#171717] transition hover:border-white/30"
                }
              >
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="text-xs uppercase tracking-widest text-white/45">
                    {stat.label}
                  </CardTitle>
                  <Icon
                    className={
                      stat.highlight
                        ? "size-4 text-[#3AA7FD]"
                        : "size-4 text-white/30"
                    }
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-black">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/45">
              Recent activity
            </h2>
            <Button variant="ghost" size="sm" asChild className="text-white/50">
              <Link href="/admin/audit">View audit log</Link>
            </Button>
          </div>
          {auditEntries.length === 0 ? (
            <p className="mt-4 text-sm text-white/40">
              No staff activity recorded yet.
            </p>
          ) : (
            <div className="mt-4 rounded-lg border border-white/10">
              {auditEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={
                    index === 0
                      ? "flex flex-wrap items-center justify-between gap-2 p-4"
                      : "flex flex-wrap items-center justify-between gap-2 border-t border-white/10 p-4"
                  }
                >
                  <p className="text-sm">
                    <span className="font-semibold">{entry.actorEmail}</span>{" "}
                    <span className="text-white/50">
                      {entry.action}d {entry.entity}
                    </span>
                  </p>
                  <p className="text-xs text-white/35">
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(entry.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/45">
            Quick actions
          </h2>
          <div className="mt-4 grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/creators/new">
                <Sparkles className="size-4" />
                Add a creator
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/brands/new">
                <Building2 className="size-4" />
                Add a brand case study
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/services/new">
                <Wallet className="size-4" />
                Add a service plan
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/admin/inquiries">
                <ClipboardList className="size-4" />
                Review inquiries{" "}
                <span className="text-white/40">({totalInquiries} total)</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
