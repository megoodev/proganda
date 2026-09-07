import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Languages } from "lucide-react";

export async function SiteHeader({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const alternate = locale === "en" ? "ar" : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-[-0.08em]">
          {t("brand")}
          <span className="text-[#ff007f]">.</span>
        </Link>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.16em] text-white/55 md:flex">
          <Link href="/about" className="transition hover:text-[#ccff00]">
            {t("about")}
          </Link>
          <Link href="/creators" className="transition hover:text-[#ccff00]">
            {t("creators")}
          </Link>
          <Link href="/services" className="transition hover:text-[#ccff00]">
            {t("services")}
          </Link>
          <Link
            href="/subscriptions"
            className="transition hover:text-[#ccff00]"
          >
            {t("subscriptions")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            locale={alternate}
            className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs font-bold text-white/70 transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            <Languages className="size-3.5" /> {t("language")}
          </Link>
          <Link
            href="/auth/register"
            className="hidden items-center gap-2 bg-[#ccff00] px-4 py-2.5 text-xs font-black uppercase text-black transition hover:bg-white sm:inline-flex"
          >
            {t("register")} <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export async function SiteFooter({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  return (
    <footer className="border-t border-white/10 px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-white/35 sm:flex-row">
        <span className="font-black tracking-[-0.05em] text-white">
          PROGANDA<span className="text-[#ccff00]">.</span>
        </span>
        <span>{t("note")}</span>
        <span>{t("contact")}</span>
      </div>
    </footer>
  );
}

export async function LocaleShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: "en" | "ar";
}) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
