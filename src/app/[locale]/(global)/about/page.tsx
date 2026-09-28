import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Lightbulb,
  Scissors,
  Send,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  
  const timeline = (t.raw("timelineItems") as string[]) || [];
  const teamMembers = (t.raw("teamMembers") as Array<{
    name: string;
    role: string;
    specialty: string;
    handle: string;
    image: string;
    accent: string;
  }>) || [];

  const timelineIcons = [Lightbulb, Users, Camera, Scissors, Send];
  
  const capabilities = [
    { icon: Lightbulb, label: "Creative strategy", accent: "text-sky-500", bgAccent: "bg-sky-500/10" },
    { icon: Camera, label: "Studio production", accent: "text-indigo-500", bgAccent: "bg-indigo-500/10" },
    { icon: Scissors, label: "Edit + post", accent: "text-purple-500", bgAccent: "bg-purple-500/10" },
    { icon: Clapperboard, label: "Distribution", accent: "text-cyan-500", bgAccent: "bg-cyan-500/10" },
  ];

  const metricsData = [
    ["18+", t("campaigns")],
    ["54M", t("impressions")],
    ["11.8%", t("engagement")],
    ["4.8x", t("roi")],
  ];

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border/60 px-6 py-20 lg:px-8 lg:py-28">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <Badge 
              variant="outline" 
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-3.5" />
              {t("eyebrow")}
            </Badge>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.08]">
              {t("title")}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("description")}
            </p>
          </div>

          {/* Quick Core Capabilities Card */}
          <Card className="border border-border/80 bg-card/80 p-6 shadow-xl backdrop-blur-xl">
            <CardHeader className="p-0 pb-6 border-b border-border/60">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <WandSparkles className="size-4" />
                {t("capabilityMeta")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-6 grid gap-4">
              {capabilities.slice(0, 3).map(({ icon: Icon, label, accent }, index) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-lg border border-border/40 bg-muted/20 p-3 transition-colors hover:border-primary/40"
                >
                  <span className={`text-xs font-black ${accent}`}>
                    0{index + 1}
                  </span>
                  <div className={`flex size-8 items-center justify-center rounded-md border border-border/60 bg-background ${accent}`}>
                    <Icon className="size-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. METRICS SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="mb-6 text-xs font-black uppercase tracking-widest text-primary">
          {t("metrics")}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metricsData.map(([value, label]) => (
            <Card key={label} className="border-border/60 bg-card/60 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
              <CardContent className="p-0">
                <p className="text-4xl font-black text-primary sm:text-5xl">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 3. CAPABILITIES GRID SECTION */}
      <section className="relative bg-muted/20 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-primary">
              {t("studio")}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl leading-tight">
              {t("studioDescription")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, label, accent, bgAccent }) => (
              <Card key={label} className="group border-border/60 bg-card/80 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <CardContent className="flex flex-col items-start p-0">
                  <div className={`flex size-12 items-center justify-center rounded-xl ${bgAccent} ${accent} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-foreground">
                    {label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* 4. WORKFLOW TIMELINE SECTION */}
      <section className="relative px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-primary">
            {t("timeline")}
          </p>

          <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Board Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
              <div>
                <Badge variant="secondary" className="gap-2 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500 border-emerald-500/20">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                  campaign signal / live
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  One connected team from brief to broadcast.
                </p>
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                100% In-House Pipeline
              </span>
            </div>

            {/* Steps Track */}
            <div className="relative mt-10">
              <div className="absolute left-6 right-6 top-5 hidden h-0.5 bg-border/80 md:block" />

              <div className="grid gap-6 md:grid-cols-5 md:gap-3">
                {timeline.map((item, index) => {
                  const Icon = timelineIcons[index] || Lightbulb;
                  return (
                    <div
                      key={item}
                      className="group relative flex items-center gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:border-primary/50 md:flex-col md:items-center md:border-0 md:bg-transparent md:p-0 md:text-center"
                    >
                      {/* Step Circle */}
                      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-4" />
                      </div>

                      {/* Content */}
                      <div className="md:mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                          0{index + 1}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-foreground">
                          {item}
                        </h3>
                      </div>

                      <ArrowRight className="ml-auto size-4 text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-1 md:mx-auto md:mt-4 md:rotate-0 rtl:rotate-180" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>

    </main>
  );
}