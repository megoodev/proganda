import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  Send,
  Scissors,
  Users,
  Camera,
  Clapperboard,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const timeline = t.raw("timelineItems") as string[];
  const teamMembers = t.raw("teamMembers") as Array<{
    name: string;
    role: string;
    specialty: string;
    handle: string;
    image: string;
    accent: string;
  }>;
  const timelineIcons = [Lightbulb, Users, Camera, Scissors, Send];
  const capabilities = [
    { icon: Lightbulb, label: "Creative strategy", accent: "#3AA7FD" },
    { icon: Camera, label: "Studio production", accent: "#1B449A" },
    { icon: Scissors, label: "Edit + post", accent: "#8a2be2" },
    { icon: Clapperboard, label: "Distribution", accent: "#00e5ff" },
  ];
  return (
    <main className="flex flex-col">
      <section className="order-1 relative overflow-hidden border-b border-white/10 px-5 pb-24 pt-20 lg:px-8">
        <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
              <span className="size-2 bg-[#1B449A]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h1 className="max-w-5xl text-[clamp(2.8rem,10vw,9rem)] font-black text-accent-foreground uppercase leading-[.84] tracking-[-0.08em]">
              {t("title")}
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-accent-foreground/55 sm:text-xl">
              {t("description")}
            </p>
          </div>
          <Card className="border-s-2 rounded-none border-[#3AA7FD] py-6 px-3  backdrop-blur-sm lg:mb-2">
            <CardHeader>
              <p className="text-[10px] font-black uppercase text-secondary-foreground tracking-[0.22em] ">
                {t("capabilityMeta")}
              </p>
            </CardHeader>
            <CardContent className="mt-8 grid gap-4 ">
              {capabilities
                .slice(0, 3)
                .map(({ icon: Icon, label, accent }, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 border-b border-white/10 pb-3"
                  >
                    <span
                      className="text-xs font-black"
                      style={{ color: accent }}
                    >
                      0{index + 1}
                    </span>
                    <Icon className="size-4" style={{ color: accent }} />
                    <span className="text-sm font-bold text-accent-foreground/75">
                      {label}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="order-4 border-y border-white/10 bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
              {t("studio")}
            </p>
            <h2 className="text-[clamp(2.3rem,6vw,4rem)] font-black tracking-[-0.06em] text-secondary-foreground">
              {t("studioDescription")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-[#151515] p-7 text-center">
                <Icon className="size-6 text-[#3AA7FD] mx-auto" />
                <h3 className="mt-16 text-xl font-bold text-accent-foreground">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="order-2 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#8a2be2]">
          {t("metrics")}
        </p>
        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            ["18+", t("campaigns")],
            ["54M", t("impressions")],
            ["11.8%", t("engagement")],
            ["4.8x", t("roi")],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#0d0d0d] p-6">
              <p className="text-4xl font-black text-[#3AA7FD]">{value}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-accent-foreground/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="workflow-section order-5 border-t border-white/10 bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
            {t("timeline")}
          </p>
          <div className="workflow-board relative mt-8 overflow-hidden border border-white/10 bg-[#171717] p-5 sm:p-8">
            <div className="workflow-grid absolute inset-0 opacity-30" />
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3AA7FD]">
                  campaign signal / live
                </p>
                <p className="mt-1 text-sm text-accent-foreground/55">
                  One connected team from brief to broadcast.
                </p>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60">
                <span className="size-2 animate-pulse rounded-full bg-[#1B449A]" />{" "}
                in motion
              </span>
            </div>
            <div className="workflow-track relative mt-8">
              <div className="workflow-line absolute left-5 right-5 top-5 hidden h-px bg-primary/30 md:block" />
              <div className="grid gap-7 md:grid-cols-5 md:gap-2">
                {timeline.map((item, index) => {
                  const Icon = timelineIcons[index];
                  return (
                    <div
                      key={item}
                      className="workflow-step relative flex items-center gap-4 md:block md:text-center"
                      style={{ animationDelay: `${index * 140}ms` }}
                    >
                      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center border border-[#3AA7FD] bg-[#171717] text-[#3AA7FD]">
                        <Icon className="size-4" />
                      </span>
                      <div className="md:mt-4">
                        <span className="text-[10px] font-bold tracking-widest text-[#3AA7FD]">
                          0{index + 1}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-accent-foreground">
                          {item}
                        </h3>
                      </div>
                      <ArrowRight className="ml-auto size-4 text-accent-foreground/25 md:mx-auto md:mt-5" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
