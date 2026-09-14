import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, Building2, User, PhoneCall } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "services" });

  // Extract translation arrays using t.raw()
  const brandServices: string[] = t.raw("brandServices");
  const creatorServices: string[] = t.raw("creatorServices");

  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary mb-4 shadow-sm">
            <Sparkles className="size-3.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
              {t("eyebrow")}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05]">
            {t("title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Brand Services Box */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-8 sm:p-10 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Building2 className="size-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t("brandsBoxTitle")}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {t("brandsBoxSubtitle")}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/40 mb-6" />

              <ul className="space-y-3.5">
                {brandServices.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <span>{t("brandCta")}</span>
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Creator Services Box */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-8 sm:p-10 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <User className="size-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t("creatorsBoxTitle")}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {t("creatorsBoxSubtitle")}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/40 mb-6" />

              <ul className="space-y-3.5">
                {creatorServices.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-card border border-border hover:bg-accent font-bold text-sm transition-colors"
              >
                <span>{t("creatorCta")}</span>
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Custom Scope / CTA Banner Box */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {t("scopeTitle")}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("scopeDescription")}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:opacity-90 transition-opacity shrink-0 shadow-lg shadow-primary/20"
          >
            <PhoneCall className="size-4" />
            <span>{t("consultation")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}