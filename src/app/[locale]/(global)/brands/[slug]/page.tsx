import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/data";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDetailPage({
  params,
}: PageProps<"/[locale]/brands/[slug]">) {
  const { locale, slug } = await params;
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) notFound();
  const t = await getTranslations({ locale, namespace: "brands" });

  return (
    <main className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white"
      >
        <ArrowLeft className="size-4" /> {t("back")}
      </Link>
      <section className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: brand.color }}
          >
            {brand.industry}
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,12vw,9rem)] font-black leading-[.86] tracking-[-0.08em]">
            {brand.name}
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/55">
            {brand.description}
          </p>
        </div>
        <div
          className="border border-white/10 bg-[#171717] p-7"
          style={{ boxShadow: `0 0 80px ${brand.color}18` }}
        >
          <p className="text-xs uppercase tracking-widest text-white/40">
            {t("campaign")}
          </p>
          <h2 className="mt-3 text-3xl font-black">{brand.campaign}</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">
                {t("views")}
              </p>
              <p
                className="mt-2 text-3xl font-black"
                style={{ color: brand.color }}
              >
                {brand.views}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">
                {t("roi")}
              </p>
              <p
                className="mt-2 text-3xl font-black"
                style={{ color: brand.color }}
              >
                {brand.roi}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-24 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
            {t("servicesUsed")}
          </p>
          <h2 className="mt-4 text-4xl font-black">{t("caseStudy")}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {brand.services.map((service) => (
            <div
              key={service}
              className="flex gap-3 border border-white/10 p-5 text-sm text-white/70"
            >
              <Check className="size-4 shrink-0 text-[#3AA7FD]" />
              {service}
            </div>
          ))}
        </div>
      </section>
      <Link
        href="/auth/register?role=brand"
        className="mt-16 inline-flex items-center gap-3 bg-primary px-5 py-3 text-sm font-bold text-black hover:bg-white"
      >
        {t("cta")} <ArrowUpRight className="size-4" />
      </Link>
    </main>
  );
}
