import { getTranslations } from "next-intl/server";
import { BrandDirectory } from "@/components/brand-directory";

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });

  return (
    <main className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#3AA7FD]">
        {t("eyebrow")}
      </p>
      <h1 className="max-w-4xl text-[clamp(2.8rem,10vw,6rem)] font-black leading-[.9] tracking-[-0.07em]">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/50">
        {t("description")}
      </p>
      <div className="mt-14">
        <BrandDirectory
          labels={{
            all: t("all"),
            caseStudy: t("caseStudy"),
            views: t("views"),
            roi: t("roi"),
          }}
        />
      </div>
    </main>
  );
}
