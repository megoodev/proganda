import { getTranslations } from "next-intl/server";
import { PromoDeal } from "@/components/PromoDeal";
import { SocialLinks } from "@/components/SocialLinks";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const initialRole =
    query.role === "blogger" || query.role === "creator" ? "blogger" : "brand";
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <main id="register" className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
      <PromoDeal />

      <div className="mb-10 text-center sm:text-start">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-3xl text-4xl sm:text-6xl font-black leading-[0.95] tracking-[-0.06em] text-white">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-white/50 max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <RegisterForm
        initialRole={initialRole}
        labels={{
          eyebrow: t("eyebrow"),
          brand: t("brand"),
          blogger: t("blogger"),
          brandDescription: t("brandDescription"),
          bloggerDescription: t("bloggerDescription"),
          name: t("name"),
          email: t("email"),
          password: t("password"),
          phone: t("phone"),
          company: t("company"),
          industry: t("industry"),
          budget: t("budget"),
          goal: t("goal"),
          website: t("website"),
          handles: t("handles"),
          niche: t("niche"),
          portfolio: t("portfolio"),
          monthlyViews: t("monthlyViews"),
          submit: t("submit"),
          haveAccount: t("haveAccount"),
          login: t("login"),
          signingUp: t("signingUp"),
          successTitle: t("successTitle"),
          successMessage: t("successMessage"),
          errorDefault: t("errorDefault"),
        }}
      />

      <div className="mt-14 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
          Connect with ProGanda
        </p>
        <SocialLinks />
      </div>
    </main>
  );
}
