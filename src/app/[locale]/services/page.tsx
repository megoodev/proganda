import { getTranslations } from "next-intl/server";
import { ServicePlans } from "@/components/service-plans";

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tierCopy = {
    tier_1: t.raw("tiers.tier_1") as {
      name: string;
      scope: string;
      offer: string;
      features: string[];
    },
    tier_2: t.raw("tiers.tier_2") as {
      name: string;
      scope: string;
      offer: string;
      features: string[];
    },
    tier_3: t.raw("tiers.tier_3") as {
      name: string;
      scope: string;
      offer: string;
      features: string[];
    },
  };
  return (
    <main className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
        {t("eyebrow")}
      </p>
      <h1 className="max-w-4xl text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/50">
        {t("description")}
      </p>
      <div className="mt-14">
        <ServicePlans
          labels={{
            select: t("select"),
            popular: t("popular"),
            calculator: t("calculator"),
            creators: t("creators"),
            estimate: t("estimate"),
            build: t("build"),
          }}
          tierCopy={tierCopy}
        />
      </div>
    </main>
  );
}
