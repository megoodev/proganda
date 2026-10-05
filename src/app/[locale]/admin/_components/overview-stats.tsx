import { getLocale, getTranslations } from "next-intl/server";
import { Eye, FileSignature, Inbox, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber, formatNumber } from "@/lib/format";
import { getHomeStats } from "@/features/home/queries/get-home-stats";
import { getRequests } from "@/features/requests/queries/get-requests";
import { getBloggers } from "@/features/bloggers/queries/get-bloggers";

export async function OverviewStats() {
  const t = await getTranslations("admin.overview.stats");
  const locale = await getLocale();
  const [{ totalViews }, requests, bloggers] = await Promise.all([getHomeStats(), getRequests(), getBloggers()]);

  const stats = [
    { key: "totalViews", icon: Eye, value: formatCompactNumber(totalViews, locale), tone: "bg-primary/10 text-primary" },
    { key: "newRequests", icon: Inbox, value: formatNumber(requests.filter((r) => r.status === "new").length, locale), tone: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { key: "pendingContracts", icon: FileSignature, value: formatNumber(bloggers.filter((b) => b.status === "pending").length, locale), tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { key: "activeCreators", icon: Users, value: formatNumber(bloggers.filter((b) => b.status === "contracted").length, locale), tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.key} className="border-border/60 shadow-xs">
          <CardContent className="flex items-start justify-between gap-4 p-5">
            <div>
              <p className="text-sm text-muted-foreground">{t(stat.key)}</p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">{stat.value}</p>
            </div>
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}>
              <stat.icon className="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
