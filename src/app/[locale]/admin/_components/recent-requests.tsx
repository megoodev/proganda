import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonCell } from "@/components/shared/person-cell";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate } from "@/lib/format";
import { getRecentRequests } from "@/features/dashboard/queries/get-recent-requests";
import { statusTone } from "@/features/requests/status-tone";

export async function RecentRequests() {
  const t = await getTranslations("admin");
  const locale = await getLocale();
  const requests = await getRecentRequests();

  return (
    <Card className="h-full border-border/60 shadow-xs">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{t("overview.recent.title")}</CardTitle>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
          <Link href="/admin/requests">
            {t("overview.viewAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="divide-y divide-border/60 pt-0">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between gap-4 py-3">
            <div className="min-w-0 flex-1">
              <PersonCell name={request.from} subtitle={request.subject} />
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <StatusBadge label={t(`requests.statuses.${request.status}`)} tone={statusTone[request.status]} />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">{t(`requests.types.${request.type}`)}</Badge>
                <span>{formatDate(request.createdAt, locale)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
