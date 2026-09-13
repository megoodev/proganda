import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, BadgeCheck, Camera, Play, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { creators } from "@/lib/data";

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.id }));
}

export default async function CreatorProfile({
  params,
}: PageProps<"/[locale]/creators/[slug]">) {
  const { slug, locale } = await params;
  const creator = creators.find((item) => item.id === slug);
  if (!creator) notFound();
  const t = await getTranslations({ locale, namespace: "creators" });
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <Link
        href="/creators"
        className="mb-12 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#3AA7FD]"
      >
        <ArrowLeft className="size-4" /> {t("profile")}
      </Link>
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div className="relative aspect-[4/5] max-h-[620px] overflow-hidden">
          <img
            src={creator.image}
            alt={creator.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: creator.accent }}
            >
              {creator.niche}
            </p>
            <h1 className="mt-2 text-5xl font-black">{creator.name}</h1>
            <p className="text-white/55">{creator.handle}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
            {creator.location} / roster profile
          </p>
          <h2 className="mt-5 max-w-2xl text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            Built for the scroll stop.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              [t("reach"), creator.reach],
              [t("engagement"), creator.engagement],
              ["Audience", "18-34"],
              ["Collabs", "24+"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#0d0d0d] p-4">
                <p className="text-2xl font-black text-[#3AA7FD]">{value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-white/35">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 border border-[#3AA7FD]/40 px-3 py-2 text-xs text-[#3AA7FD]">
              <BadgeCheck className="size-4" /> Usage rights ready
            </span>
            <span className="inline-flex items-center gap-2 border border-[#8a2be2]/50 px-3 py-2 text-xs text-white">
              <ShieldCheck className="size-4 text-[#8a2be2]" /> Brand safe
            </span>
          </div>
        </div>
      </div>
      <section className="mt-20 border-t border-white/10 pt-10">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
          Sample reels
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Launch cut", "Culture edit", "Behind the scene"].map((title) => (
            <div
              key={title}
              className="relative flex aspect-video items-end overflow-hidden bg-[#171717] p-5"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&q=80&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
              <div className="relative flex w-full items-center justify-between">
                <span className="font-bold">{title}</span>
                <span className="flex size-10 items-center justify-center rounded-full bg-[#3AA7FD] text-black">
                  <Play className="ml-1 size-4 fill-current" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-16 flex flex-wrap gap-3 text-xs text-white/60">
        <span className="inline-flex items-center gap-2 border border-white/15 px-3 py-2">
          <Camera className="size-4" /> {creator.platforms.join(" / ")}
        </span>
        <span className="border border-white/15 px-3 py-2">
          Past collaborations: LUMEN, VANTA, NOVA
        </span>
      </section>
    </main>
  );
}
