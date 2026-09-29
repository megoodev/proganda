import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ArrowLeftRight,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function IntegrationsSection({ t }: { t: (key: string) => string }) {
  // Single Integration Partner Configuration
  const partner = {
    logo: "IMG_0092.JPG.jpeg", // Ensure casing matches your file exactly
    name: "Integration Partner",
  };

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
      {/* Background Radial Glow Accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-2 rounded-full border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md"
            >
              <Zap className="size-3.5 fill-primary" />
              {t("integrationsEyebrow")}
            </Badge>

            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {t("integrationsTitle")}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("integrationsDescription")}
            </p>

            <div className="mt-8">
              <Button
                asChild
                variant="default"
                size="lg"
                className="group rounded-xl px-7 py-6 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
              >
                <Link href="/services" className="flex items-center gap-2">
                  {t("integrationsCta")}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Visual Column (1-to-1 Connection Engine) */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto flex max-w-xl flex-col items-center justify-between gap-6 sm:flex-row">
              {/* Connecting Line with Pulsing Data Sync (Desktop) */}
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:flex sm:items-center sm:justify-center">
                <div className="h-0.5 w-32 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
                <div className="absolute flex size-8 items-center justify-center rounded-full border border-primary/40 bg-background shadow-md">
                  <ArrowLeftRight className="size-4 animate-pulse text-primary" />
                </div>
              </div>

              {/* Node 1: ProGanda Hub */}
              <Card className="group relative w-full overflow-hidden border-primary/40 bg-card/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/60 sm:w-[240px]">
                <CardContent className="flex flex-col items-center p-0 text-center">
                  <div className="relative flex size-24 items-center justify-center p-2 rounded-2xl bg-linear-to-br from-primary/20 via-accent to-background shadow-inner ring-1 ring-primary/30">
                    <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-sm animate-pulse" />
                    <Image
                      src="/assits/logos/IMG_1531.PNG"
                      alt="ProGanda"
                      width={80}
                      height={80}
                      className="relative z-10 max-h-full max-w-full object-cover dark:invert"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary dark:invert">
                    <Sparkles className="size-3.5" />
                    PROGANDA HUB
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                    Core Platform
                  </p>
                </CardContent>
              </Card>

              {/* Node 2: Partner Integration */}
              <Card className="group relative w-full overflow-hidden border-border/60 bg-card/60 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-card/90 hover:shadow-xl sm:w-[240px]">
                <CardContent className="flex flex-col items-center p-0 text-center">
                  <div className="relative flex size-24 items-center justify-center rounded-2xl bg-accent/50  shadow-inner ring-1 ring-border/50 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={`/assits/logos/IMG_9506.JPG.jpeg`}
                      alt={partner.name}
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
                    Verified Integration
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Strategy Pill Badge */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-2.5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Strategy
                </span>
                <span className="text-primary/30">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Creators
                </span>
                <span className="text-primary/30">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}