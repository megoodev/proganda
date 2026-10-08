import { getLocale, getTranslations } from "next-intl/server";
import { Eye, FileSignature, Inbox, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber, formatNumber } from "@/lib/format";
import { getOverviewStats } from "@/features/dashboard/queries/get-overview-stats";

export async function OverviewStats() {
  const t = await getTranslations("admin.overview.stats");
  const locale = await getLocale();
  const stats = await getOverviewStats();

  const cards = [
    { key: "totalViews", icon: Eye, value: formatCompactNumber(stats.totalViews, locale), tone: "bg-primary/10 text-primary" },
    { key: "newRequests", icon: Inbox, value: formatNumber(stats.newRequests, locale), tone: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { key: "pendingContracts", icon: FileSignature, value: formatNumber(stats.pendingContracts, locale), tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { key: "activeCreators", icon: Users, value: formatNumber(stats.activeCreators, locale), tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => (
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
