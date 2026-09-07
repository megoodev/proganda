import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Lightbulb,
  Scissors,
} from "lucide-react";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const timeline = t.raw("timelineItems") as string[];
  const capabilities = [
    { icon: Lightbulb, label: "Creative strategy" },
    { icon: Camera, label: "Studio production" },
    { icon: Scissors, label: "Edit + post" },
    { icon: Clapperboard, label: "Distribution" },
  ];
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-24 lg:px-8">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-5xl text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">
          {t("title")}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/55">
          {t("description")}
        </p>
      </section>
      <section className="border-y border-white/10 bg-[#151515] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
              {t("studio")}
            </p>
            <h2 className="text-5xl font-black tracking-[-0.06em]">
              {t("studioDescription")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-[#151515] p-7">
                <Icon className="size-6 text-[#ccff00]" />
                <h3 className="mt-16 text-xl font-bold">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
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
              <p className="text-4xl font-black text-[#ccff00]">{value}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            {t("timeline")}
          </p>
          <div className="grid gap-3 md:grid-cols-5">
            {timeline.map((item, index) => (
              <div key={item} className="border border-white/10 p-5">
                <span className="text-xs text-[#ff007f]">0{index + 1}</span>
                <h3 className="mt-14 text-xl font-bold">{item}</h3>
                <ArrowRight className="mt-8 size-4 text-white/30" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
