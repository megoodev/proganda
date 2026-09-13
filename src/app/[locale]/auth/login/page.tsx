import { getTranslations } from "next-intl/server";
import { PromoDeal } from "@/components/PromoDeal";
import { SocialLinks } from "@/components/SocialLinks";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <main id="login" className="mx-auto max-w-xl px-5 py-20 lg:px-8">
      <PromoDeal />

      <div className="text-center mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-white">
          {t("loginTitle")}
        </h1>
        <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
          {t("loginSubtitle")}
        </p>
      </div>

      <LoginForm
        labels={{
          email: t("email"),
          password: t("password"),
          login: t("login"),
          signingIn: t("signingIn"),
          dontHaveAccount: t("dontHaveAccount"),
          signUp: t("signUp"),
          errorDefault: t("errorDefault"),
        }}
      />

      <div className="mt-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
          Connect with ProGanda
        </p>
        <SocialLinks />
      </div>
    </main>
  );
}
