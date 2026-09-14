import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Languages } from "lucide-react";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function SiteHeader({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const alternate = locale === "en" ? "ar" : "en";
  const brandFirstPart = locale === "en" ? "Pro" : "برو";
  const brandSecondPart = locale === "en" ? "Ganda" : "غاندا";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-5 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-black tracking-[-0.08em]"
        >
          <span className="text-white">{brandFirstPart}</span>
          <span className="text-[#3AA7FD]">{brandSecondPart}</span>
          <span className="text-[#1B449A]">.</span>
        </Link>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.16em] text-white/55 md:flex">
          <Link href="/about" className="transition hover:text-[#3AA7FD]">
            {t("about")}
          </Link>
          <Link href="/creators" className="transition hover:text-[#3AA7FD]">
            {t("creators")}
          </Link>
          <Link href="/brands" className="transition hover:text-[#3AA7FD]">
            {t("brands")}
          </Link>
          <Link href="/contact" className="transition hover:text-[#3AA7FD]">
            {t("contact")}
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} label={t("language")} />
          <MobileNavigation
            labels={{
              about: t("about"),
              creators: t("creators"),
              brands: t("brands"),
              services: t("services"),
              subscriptions: t("subscriptions"),
              contact: t("contact"),
              register: t("register"),
              language: t("language"),
            }}
            alternateLocale={alternate}
          />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/auth/register"
              className="hidden items-center gap-2 bg-[#3AA7FD] px-4 py-2.5 text-xs font-black uppercase text-white!    transition hover:bg-white sm:inline-flex"
            >
              {t("register")} <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export async function SiteFooter({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const brandFirstPart = locale === "en" ? "PRO" : "برو";
  const brandSecondPart = locale === "en" ? "GANDA" : "غاندا";

  return (
    <footer className="border-t border-white/10 px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-white/35 sm:flex-row">
        <span className="font-black tracking-tighter text-white">
          <span className="text-[#1B449A]">{brandFirstPart}</span>
          <span className="text-[#3AA7FD]">{brandSecondPart}</span>
          <span className="text-white">.</span>
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
