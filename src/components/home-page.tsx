import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, WandSparkles } from "lucide-react";
import { brandNames, creators, serviceTiers } from "@/lib/data";
import { HomeCreatorCarousel } from "@/components/home-creator-carousel";
import { HomeHeroCarousel } from "@/components/home-hero-carousel";
import { Separator } from "./ui/separator";

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
      <Separator />
      <div className=" bg-primary py-3 text-accent-foreground">
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
            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl text-accent-foreground">
              {t("creatorsTitle")}
            </h2>
          </div>
          <Link
            href="/creators"
            className="hidden text-sm font-bold text-primary sm:block"
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
      <Separator />
      <section className="workflow-section  bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {t("workflowEyebrow")}
            </p>
            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl text-accent-foreground">
              {t("workflowTitle")}
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-accent-foreground/60 sm:max-w-md lg:max-w-lg">
              {t("workflowDescription")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-white"
            >
              {t("aboutCta")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="workflow-board relative overflow-hidden border border-white/10 bg-[#171717] p-5 sm:p-8">
            <div className="workflow-grid absolute inset-0 opacity-30" />
            <div className="relative flex items-center justify-between border-b border-white/15 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center bg-primary text-black">
                  <WandSparkles className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    live pipeline
                  </p>
                  <p className="text-sm font-bold text-accent-foreground">
                    {t("reel")}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                <span className="size-2 animate-pulse rounded-full bg-primary" />{" "}
                studio / live
              </span>
            </div>
            <div className="workflow-track relative mt-8">
              <div className="workflow-line absolute left-5 right-5 top-5 h-px bg-primary/30" />
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
                    <span className="mx-auto flex size-10 items-center justify-center border border-[#3AA7FD] bg-[#171717] text-xs font-black text-primary">
                      {index === 4 ? <Check className="size-4" /> : number}
                    </span>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-10 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-white/45">
              <span>one sharp team</span>
              <span className="text-primary">100% in-house production</span>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      <section className="bg-background text-foreground px-5 py-20 lg:px-8 lg:py-24 transition-colors duration-200">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          {/* Left Column: Text Content */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {t("integrationsEyebrow")}
            </p>
            <h2 className="max-w-xl text-5xl font-black leading-[.9] tracking-[-0.06em] sm:text-7xl text-foreground">
              {t("integrationsTitle")}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("integrationsDescription")}
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              {t("integrationsCta")}{" "}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Right Column: Grid Layout */}
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Decorative Lines */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[70%] -translate-x-1/2 bg-primary/20 sm:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-primary/20 sm:block" />

            {/* Central Main Logo Box */}
            <div className="col-span-2 row-span-2 flex min-h-44 items-center justify-center border border-primary/40 bg-card p-6 shadow-sm sm:col-span-2 sm:row-span-2">
              <div className="text-center">
                <div className="mx-auto flex size-20 items-center justify-center overflow-hidden rounded-xl bg-accent p-2">
                  <img
                    src="/assits/logos/IMG_1531.PNG"
                    alt="ProGanda"
                    /* Inverts dark-colored logo pixels in dark mode, keeps normal in light mode */
                    className="size-full object-contain dark:invert"
                  />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  PROGANDA / HUB
                </p>
              </div>
            </div>

            {/* Partner Logos */}
            {["IMG_0092.JPG.jpeg", "IMG_9506.JPG.jpeg", "IMG_9508.PNG"].map(
              (logo, index) => (
                <div
                  key={logo}
                  className="relative z-10 flex min-h-20 items-center justify-center border border-border bg-card p-4 transition hover:border-primary hover:bg-accent/50 shadow-sm"
                >
                  <img
                    src={`/assits/logos/${logo}`}
                    alt={`Integration ${index + 1}`}
                    /* Replaces 'mix-blend-screen' with theme-driven inversion filter */
                    className="max-h-14 w-full object-contain dark:invert"
                  />
                </div>
              ),
            )}

            {/* Badge Box */}
            <div className="relative z-10 flex min-h-20 items-center justify-center border border-primary/30 bg-primary/10 p-4 text-center text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Strategy + creators + production
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
