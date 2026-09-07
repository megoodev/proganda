import { getTranslations } from "next-intl/server";

export default async function LoginPage({
  params,
}: PageProps<"/[locale]/auth/login">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return (
    <main id="login" className="mx-auto max-w-xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
        {t("eyebrow")}
      </p>
      <h1 className="text-6xl font-black tracking-[-0.07em]">{t("login")}</h1>
      <form className="mt-10 grid gap-4 border border-white/10 bg-white/[.03] p-6 sm:p-9">
        <label className="grid gap-2 text-xs uppercase tracking-widest text-white/50">
          email
          <input required type="email" className="field" />
        </label>
        <label className="grid gap-2 text-xs uppercase tracking-widest text-white/50">
          password
          <input required type="password" className="field" />
        </label>
        <button className="mt-4 bg-[#ccff00] px-5 py-3 text-sm font-bold text-black hover:bg-white">
          {t("login")}
        </button>
      </form>
    </main>
  );
}
