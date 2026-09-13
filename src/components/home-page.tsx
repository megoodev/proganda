import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, WandSparkles } from "lucide-react";
import { brandNames, creators, serviceTiers } from "@/lib/data";
import { HomeCreatorCarousel } from "@/components/home-creator-carousel";
import { HomeHeroCarousel } from "@/components/home-hero-carousel";

export async function HomePage({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="overflow-hidden">
      <HomeHeroCarousel
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        primaryCta={t("primaryCta")}
        secondaryCta={t("secondaryCta")}
      />
      <div className="border-y border-white/10 bg-[#3AA7FD] py-3 text-black">
        <div className="mx-auto flex max-w-7xl justify-between gap-5 overflow-hidden px-5 text-xs font-black uppercase tracking-[0.18em] lg:px-8">
          <span>12.4B+ {t("views")}</span>
          <span className="hidden sm:block">500+ campaigns shipped</span>
          <span>100% in-house production</span>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
              {t("creatorsEyebrow")}
            </p>
            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              {t("creatorsTitle")}
            </h2>
          </div>
          <Link
            href="/creators"
            className="hidden text-sm font-bold text-[#3AA7FD] sm:block"
          >
            {common("explore")} <ArrowRight className="inline size-4" />
          </Link>
        </div>
        <HomeCreatorCarousel
          creators={creators}
          viewsLabel={t("views")}
          locale={locale}
        />
      </section>
      <section className="workflow-section border-y border-white/10 bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
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
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#3AA7FD] transition hover:text-white"
            >
              {t("aboutCta")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="workflow-board relative overflow-hidden border border-white/10 bg-[#171717] p-5 sm:p-8">
            <div className="workflow-grid absolute inset-0 opacity-30" />
            <div className="relative flex items-center justify-between border-b border-white/15 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center bg-[#3AA7FD] text-black">
                  <WandSparkles className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3AA7FD]">
                    live pipeline
                  </p>
                  <p className="text-sm font-bold text-white">{t("reel")}</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
                <span className="size-2 animate-pulse rounded-full bg-[#1B449A]" />{" "}
                studio / live
              </span>
            </div>
            <div className="workflow-track relative mt-8">
              <div className="workflow-line absolute left-5 right-5 top-5 h-px bg-[#3AA7FD]/30" />
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
                    <span className="mx-auto flex size-10 items-center justify-center border border-[#3AA7FD] bg-[#171717] text-xs font-black text-[#3AA7FD]">
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
              <span className="text-[#3AA7FD]">100% in-house production</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#151515] px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
              {t("integrationsEyebrow")}
            </p>
            <h2 className="max-w-xl text-5xl font-black leading-[.9] tracking-[-0.06em] sm:text-7xl">
              {t("integrationsTitle")}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
              {t("integrationsDescription")}
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#3AA7FD]"
            >
              {t("integrationsCta")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[70%] -translate-x-1/2 bg-[#3AA7FD]/30 sm:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-[#1B449A]/30 sm:block" />
            <div className="col-span-2 row-span-2 flex min-h-44 items-center justify-center border border-[#3AA7FD]/50 bg-[#0d0d0d] p-6 sm:col-span-2 sm:row-span-2">
              <div className="text-center">
                <div className="mx-auto flex size-20 items-center justify-center overflow-hidden bg-white p-2">
                  <img
                    src="/assits/logos/IMG_1531.PNG"
                    alt="ProGanda"
                    className="size-full object-contain"
                  />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#3AA7FD]">
                  PROGANDA / HUB
                </p>
              </div>
            </div>
            {["IMG_0092.JPG.jpeg", "IMG_9506.JPG.jpeg", "IMG_9508.PNG"].map(
              (logo, index) => (
                <div
                  key={logo}
                  className="relative z-10 flex min-h-20 items-center justify-center border border-white/10 bg-[#1d1d1d] p-4 transition hover:border-[#3AA7FD] hover:bg-[#222222]"
                >
                  <img
                    src={`/assits/logos/${logo}`}
                    alt={`Integration ${index + 1}`}
                    className="max-h-14 w-full object-contain mix-blend-screen"
                  />
                </div>
              ),
            )}
            <div className="relative z-10 flex min-h-20 items-center justify-center border border-[#1B449A]/40 bg-[#1B449A]/10 p-4 text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#1B449A]">
              Strategy + creators + production
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
