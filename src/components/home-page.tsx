import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { brandNames, creators, serviceTiers } from "@/lib/data";
import { HomeCreatorCarousel } from "@/components/home-creator-carousel";

export async function HomePage({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto flex min-h-170 max-w-7xl items-end px-5 pb-20 pt-24 lg:px-8">
        <div className="pointer-events-none absolute -right-40 top-16 size-155 rounded-full bg-[#8a2be2]/20 blur-[130px]" />
        <div className="relative max-w-5xl">
          <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00]">
            <Sparkles className="size-4" /> {t("eyebrow")}
          </p>
          <h1 className="max-w-5xl text-[clamp(3.6rem,10vw,9rem)] font-black uppercase leading-[.84] tracking-[-0.09em]">
            {t("title")}
          </h1>
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-white/55">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/creators"
                className="inline-flex items-center gap-3 bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
              >
                {t("primaryCta")} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                {t("secondaryCta")} <ArrowDownRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="border-y border-white/10 bg-[#ccff00] py-3 text-black">
        <div className="mx-auto flex max-w-7xl justify-between gap-5 overflow-hidden px-5 text-xs font-black uppercase tracking-[0.18em] lg:px-8">
          <span>12.4B+ {t("views")}</span>
          <span className="hidden sm:block">500+ campaigns shipped</span>
          <span>100% in-house production</span>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
              {t("creatorsEyebrow")}
            </p>
            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              {t("creatorsTitle")}
            </h2>
          </div>
          <Link
            href="/creators"
            className="hidden text-sm font-bold text-[#ccff00] sm:block"
          >
            {common("explore")} <ArrowRight className="inline size-4" />
          </Link>
        </div>
        <HomeCreatorCarousel creators={creators} viewsLabel={t("views")} />
      </section>
      <section className="workflow-section border-y border-white/10 bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              {t("workflowEyebrow")}
            </p>
            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              {t("workflowTitle")}
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/45">
              {t("workflowDescription")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#ccff00] transition hover:text-white"
            >
              {t("aboutCta")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="workflow-board relative overflow-hidden border border-white/10 bg-[#171717] p-5 sm:p-8">
            <div className="workflow-grid absolute inset-0 opacity-30" />
            <div className="relative flex items-center justify-between border-b border-white/15 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center bg-[#ccff00] text-black">
                  <WandSparkles className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                    live pipeline
                  </p>
                  <p className="text-sm font-bold text-white">{t("reel")}</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
                <span className="size-2 animate-pulse rounded-full bg-[#ff007f]" />{" "}
                studio / live
              </span>
            </div>
            <div className="workflow-track relative mt-8">
              <div className="workflow-line absolute left-5 right-5 top-5 h-px bg-[#ccff00]/30" />
              <div className="relative grid grid-cols-5 gap-2">
                {[
                  ["01", "Spark"],
                  ["02", "Match"],
                  ["03", "Shoot"],
                  ["04", "Edit"],
                  ["05", "Launch"],
                ].map(([number, label], index) => (
                  <div
                    className="workflow-step text-center"
                    style={{ animationDelay: `${index * 140}ms` }}
                    key={number}
                  >
                    <span className="mx-auto flex size-10 items-center justify-center border border-[#ccff00] bg-[#171717] text-xs font-black text-[#ccff00]">
                      {index === 4 ? <Check className="size-4" /> : number}
                    </span>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white/65">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-10 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-white/45">
              <span>one sharp team</span>
              <span className="text-[#ccff00]">100% in-house production</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8a2be2]">
          {t("offersEyebrow")}
        </p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            {t("offersTitle")}
          </h2>
          <Link href="/services" className="text-sm font-bold text-[#ccff00]">
            {t("servicesCta")} <ArrowRight className="inline size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <Link
              href="/services"
              key={tier.id}
              className="border border-white/10 p-6 transition hover:border-[#ccff00]"
            >
              <p className="text-xs text-white/35">{tier.eyebrow}</p>
              <h3 className="mt-8 text-2xl font-black">{tier.name}</h3>
              <p className="mt-3 text-sm text-[#ccff00]">{tier.offer}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-2xl font-black tracking-tight text-white/25 sm:text-4xl">
            {brandNames.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
          <Link
            href="/brands"
            className="shrink-0 text-sm font-bold text-[#ccff00]"
          >
            {common("brands")} <ArrowRight className="inline size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
