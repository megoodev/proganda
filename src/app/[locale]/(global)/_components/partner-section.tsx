import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeftRight, ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// After renaming the files (no spaces/dots/IMG_ names):
const HUB_LOGO = "/assets/logos/proganda-logo.png";
const PARTNER_LOGO = "/assets/logos/zad-trips.jpeg";

export async function PartnerSection() {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Badge
              variant="outline"
              className="mb-4 gap-2 rounded-full border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Zap className="size-3.5 fill-primary" />
              {t("integrationsEyebrow")}
            </Badge>

            <h2 className="text-3xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl">
              {t("integrationsTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("integrationsDescription")}
            </p>

            <Button asChild size="lg" className="group mt-8 rounded-xl px-7 py-6 font-bold shadow-lg shadow-primary/20">
              <Link href="/portfolio" className="flex items-center gap-2">
                {t("integrationsCta")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto flex max-w-xl flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex">
                <div className="h-0.5 w-32 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
                <div className="absolute flex size-8 items-center justify-center rounded-full border border-primary/40 bg-background shadow-md">
                  <ArrowLeftRight className="size-4 text-primary" />
                </div>
              </div>

              <Card className="relative w-full overflow-hidden border-primary/40 bg-card/80 p-6 shadow-xl backdrop-blur-xl sm:w-[240px]">
                <CardContent className="flex flex-col items-center p-0 text-center">
                  <div className="flex size-24 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 via-accent to-background p-2 ring-1 ring-primary/30">
                    <Image src={HUB_LOGO} alt="ProGanda" width={80} height={80} className="max-h-full max-w-full object-contain dark:invert" />
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary">
                    <Sparkles className="size-3.5" />
                    PROGANDA HUB
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                    {t("integrationCorePlatform")}
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative w-full overflow-hidden border-border/60 bg-card/60 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl sm:w-[240px]">
                <CardContent className="flex flex-col items-center p-0 text-center">
                  <div className="flex size-24 items-center justify-center rounded-2xl bg-accent/50 ring-1 ring-border/50">
                    <Image
                      src={PARTNER_LOGO}
                      alt={t("partnerLogoAlt")}
                      width={80}
                      height={80}
                      className="max-h-full max-w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 dark:invert"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-foreground/80">
                    <ShieldCheck className="size-3.5 text-primary" />
                    zad x trips
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                    {t("featuredPartnership")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-2.5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t("strategy")}</span>
                <span className="text-primary/30">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t("creatorLabel")}</span>
                <span className="text-primary/30">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t("production")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
