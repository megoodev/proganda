// src/components/PromoDeal.tsx
import { getTranslations } from "next-intl/server";
import { Sparkles, ArrowUpRight } from "lucide-react";

export async function PromoDeal({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <div className="relative mb-8 overflow-hidden border border-[#3AA7FD]/40 bg-primary/10 p-4 sm:p-5 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center border border-[#3AA7FD] bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3AA7FD]">
                {t("promoEyebrow")}
              </span>
              <span className="bg-[#1B449A] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white!">
                {t("promoDiscount")}
              </span>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-secondary-foreground">
              {t("promoDescription", { code: "LAUNCH20" })}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#3AA7FD] flex items-center gap-1">
            {t("promoAutoApplied")}
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
