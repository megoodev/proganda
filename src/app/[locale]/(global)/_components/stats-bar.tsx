import { getTranslations } from "next-intl/server";
import { Sparkles, Zap } from "lucide-react";
import { getSiteStats } from "@/features/home/queries/get-site-stats";

export async function StatsBar({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const { totalViews } = await getSiteStats();

  const views = new Intl.NumberFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(totalViews);

  return (
    <div className="relative border-y border-primary/20 bg-primary/10 py-4 text-primary backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs font-black uppercase tracking-widest sm:px-8">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-primary" />
          <span>
            {views}+ {t("views")}
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>{t("campaignsShipped")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span>{t("inHouseProduction")}</span>
        </div>
      </div>
    </div>
  );
}
