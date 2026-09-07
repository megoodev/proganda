import { getTranslations } from "next-intl/server";
import { RegisterPortal } from "@/components/register-portal";

export default async function RegisterPage({
  params,
  searchParams,
}: PageProps<"/[locale]/auth/register">) {
  const { locale } = await params;
  const query = await searchParams;
  const role =
    query.role === "brand" || query.role === "creator" ? query.role : undefined;
  const t = await getTranslations({ locale, namespace: "auth" });
  return (
    <main className="mx-auto max-w-4xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
        {t("eyebrow")}
      </p>
      <h1 className="mb-12 max-w-3xl text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">
        {t("title")}
      </h1>
      <RegisterPortal
        initialRole={role}
        labels={{
          brandRole: t("brandRole"),
          creatorRole: t("creatorRole"),
          company: t("company"),
          industry: t("industry"),
          budget: t("budget"),
          goal: t("goal"),
          handles: t("handles"),
          niche: t("niche"),
          portfolio: t("portfolio"),
          monthlyViews: t("monthlyViews"),
          submit: t("submit"),
        }}
      />
      <p className="mt-8 text-sm text-white/45">
        {t("already")}{" "}
        <a href="#login" className="text-[#ccff00]">
          {t("login")}
        </a>
      </p>
    </main>
  );
}
