import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, FileSignature } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonCell } from "@/components/shared/person-cell";
import { formatDate } from "@/lib/format";
import { getPendingContracts } from "@/features/dashboard/queries/get-pending-contracts";

export async function PendingContracts() {
  const t = await getTranslations("admin");
  const locale = await getLocale();
  const pending = await getPendingContracts();

  return (
    <Card className="h-full border-border/60 shadow-xs">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{t("overview.pending.title")}</CardTitle>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
          <Link href="/admin/contracts">
            {t("overview.viewAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
            <FileSignature className="size-6" />
            {t("overview.pending.empty")}
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {pending.map((contract) => (
              <div key={contract.id} className="flex items-center justify-between gap-3 py-3">
                <PersonCell name={contract.party} subtitle={formatDate(contract.createdAt, locale)} />
                <Badge variant="secondary">{t(`contracts.types.${contract.partyType}`)}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
