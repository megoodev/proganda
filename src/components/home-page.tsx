import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { 
  ArrowRight, 
  Check, 
  Layers, 
  Sparkles, 
  WandSparkles, 
  Zap 
} from "lucide-react";
import { creators } from "@/lib/data";
import { HomeCreatorCarousel } from "@/components/home-creator-carousel";
import { HomeHeroCarousel } from "@/components/home-hero-carousel";

// Importing shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function HomePage({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  const pipelineSteps = [
    { num: "01", label: "Spark", sub: "Idea Generation" },
    { num: "02", label: "Match", sub: "Creator Casting" },
    { num: "03", label: "Shoot", sub: "100% In-House" },
    { num: "04", label: "Edit", sub: "Post-Production" },
    { num: "05", label: "Launch", sub: "Campaign Live" },
  ];

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <HomeHeroCarousel
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        primaryCta={t("primaryCta")}
        secondaryCta={t("secondaryCta")}
      />

      <Separator />

      {/* 2. STATS BANNER */}
      <div className="relative border-y border-primary/20 bg-primary/10 py-4 text-primary backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs font-black uppercase tracking-widest sm:px-8">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary animate-pulse" />
            <span>12.4B+ {t("views")}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="size-1.5 rounded-full bg-primary" />
            <span>500+ Campaigns Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span>100% In-House Production</span>
          </div>
        </div>
      </div>

      {/* 3. CREATORS SHOWCASE SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge 
              variant="outline" 
              className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-3.5" />
              {t("creatorsEyebrow")}
            </Badge>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {t("creatorsTitle")}
            </h2>
          </div>

          <Button asChild variant="ghost" className="group gap-2 font-bold text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/creators">
              {common("explore")} 
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>

        <HomeCreatorCarousel
          creators={creators}
          viewsLabel={t("views")}
          locale={locale}
        />
      </section>

      <Separator />

      {/* 4. WORKFLOW PIPELINE SECTION */}
      <section className="relative overflow-hidden bg-muted/30 px-6 py-20 lg:px-8 lg:py-28">
        {/* Subtle Background Lighting */}
        <div className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <Badge 
              variant="outline" 
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Layers className="size-3.5" />
              {t("workflowEyebrow")}
            </Badge>

            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {t("workflowTitle")}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("workflowDescription")}
            </p>

            <Button asChild variant="outline" className="group mt-8 gap-2 rounded-xl border-border/80 font-bold hover:border-primary">
              <Link href="/about">
                {t("aboutCta")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Right Workflow Board Card */}
          <div className="lg:col-span-7">
            <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                    <WandSparkles className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Live Pipeline
                    </p>
                    <p className="text-base font-bold text-foreground">
                      {t("reel")}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary" className="gap-2 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500 border-emerald-500/20">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                  Studio / Live
                </Badge>
              </div>

              {/* Steps Track */}
              <div className="relative mt-10">
                <div className="absolute left-4 right-4 top-5 -z-0 h-0.5 bg-border sm:left-6 sm:right-6" />
                
                <div className="relative z-10 grid grid-cols-5 gap-2">
                  {pipelineSteps.map((step, index) => {
                    const isCompleted = index === 4;
                    return (
                      <div key={step.num} className="flex flex-col items-center text-center">
                        <div 
                          className={`flex size-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isCompleted 
                              ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" 
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                        >
                          {isCompleted ? <Check className="size-5" /> : <span className="text-xs font-black">{step.num}</span>}
                        </div>
                        <p className="mt-3 text-xs font-bold uppercase text-foreground">{step.label}</p>
                        <p className="hidden text-[10px] text-muted-foreground sm:block">{step.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer info */}
              <div className="mt-10 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="font-semibold">One Sharp Team</span>
                <span className="font-bold text-primary">100% In-House Production</span>
              </div>
            </Card>
          </div>

        </div>
      </section>

      <Separator />

      {/* 5. INTEGRATIONS & HUB SECTION */}
      <section className="relative px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5">
            <Badge 
              variant="outline" 
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Zap className="size-3.5" />
              {t("integrationsEyebrow")}
            </Badge>

            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {t("integrationsTitle")}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("integrationsDescription")}
            </p>

            <Button asChild variant="link" className="group mt-6 p-0 font-bold text-primary hover:no-underline">
              <Link href="/services" className="flex items-center gap-2">
                {t("integrationsCta")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Right Bento Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              
              {/* Central Hub Logo Card */}
              <Card className="col-span-2 row-span-2 border-primary/30 bg-gradient-to-br from-card to-muted/40 p-6 shadow-xl backdrop-blur-xl">
                <CardContent className="flex h-full flex-col items-center justify-center p-0 text-center">
                  <div className="flex size-24 items-center justify-center rounded-2xl bg-accent p-3 shadow-inner">
                    <img
                      src="/assits/logos/IMG_1531.PNG"
                      alt="ProGanda"
                      className="size-full object-contain dark:invert"
                    />
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-widest text-primary">
                    PROGANDA / HUB
                  </p>
                </CardContent>
              </Card>

              {/* Partner Integration Cards */}
              {["IMG_0092.JPG.jpeg", "IMG_9506.JPG.jpeg", "IMG_9508.PNG"].map((logo, index) => (
                <Card 
                  key={logo} 
                  className="group flex min-h-[100px] items-center justify-center border-border/60 bg-card/60 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-accent/40 hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <img
                      src={`/assits/logos/${logo}`}
                      alt={`Integration ${index + 1}`}
                      className="max-h-12 w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 dark:invert"
                    />
                  </CardContent>
                </Card>
              ))}

              {/* Special Badge Box */}
              <Card className="col-span-2 sm:col-span-1 border-primary/30 bg-primary/10 p-4 shadow-sm">
                <CardContent className="flex h-full items-center justify-center p-0 text-center text-[10px] font-black uppercase tracking-wider text-primary">
                  Strategy + Creators + Production
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}