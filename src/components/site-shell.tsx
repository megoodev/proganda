import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiteHeaderClient } from "./SiteHeaderClient";

// 1️⃣ مكون السيرفر للهيدر (يستقبل locale فقط)
export async function SiteHeader({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const alternate = locale === "en" ? "ar" : "en";
  const brandFirstPart = locale === "en" ? "Pro" : "برو";
  const brandSecondPart = locale === "en" ? "Ganda" : "غاندا";

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/creators", label: t("creators") },
    { href: "/services", label: t("services") },
    { href: "/brands", label: t("brands") },
    { href: "/contact", label: t("contact") },
  ];

  const mobileLabels = {
    home: t("home"),
    about: t("about"),
    creators: t("creators"),
    brands: t("brands"),
    services: t("services"),
    contact: t("contact"),
    register: t("register"),
    language: t("language"),
  };

  return (
    <SiteHeaderClient
      locale={locale}
      brandFirstPart={brandFirstPart}
      brandSecondPart={brandSecondPart}
      navItems={navItems}
      registerLabel={t("register")}
      languageLabel={t("language")}
      alternateLocale={alternate}
      mobileLabels={mobileLabels}
    />
  );
}

// 2️⃣ الفوتر (Server Component)
export async function SiteFooter({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const common = await getTranslations({ locale, namespace: "common" });
  const brandFirstPart = locale === "en" ? "Pro" : "برو";
  const brandSecondPart = locale === "en" ? "Ganda" : "غاندا";

  const navItems = [
    { href: "/home", label: common("home") },
    { href: "/about", label: common("about") },
    { href: "/creators", label: common("creators") },
    { href: "/services", label: common("services") },
    { href: "/brands", label: common("brands") },
    { href: "/contact", label: common("contact") },
  ];

  return (
    <footer className="border-t border-border bg-muted/40 px-6 pb-12 pt-16 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_.6fr]">
          {/* Brand Info & Primary CTA */}
          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-block text-2xl font-black tracking-tighter text-foreground"
            >
              <span className="text-foreground">{brandFirstPart}</span>
              <span className="text-primary">{brandSecondPart}</span>
              <span className="text-destructive">.</span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 font-bold uppercase tracking-wider rounded-lg shadow-md gap-2"
            >
              <Link href="/contact">
                {t("cta")}
                <ArrowUpRight className="size-4 rtl:rotate-90" />
              </Link>
            </Button>
          </div>

          {/* Navigation & Contact Links */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              {t("navigate")}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>


            <a
              href={`mailto:${t("contact")}`}
              className="mt-8 inline-block text-sm font-bold text-primary transition-opacity hover:opacity-80"
            >
              {t("contact")}
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer Note */}
        <div className="flex flex-col justify-between gap-4 text-xs font-medium text-muted-foreground sm:flex-row">
          <span>{t("note")}</span>
        </div>
      </div>
    </footer>
  );
}

// 3️⃣ الـ Shell الرئيسي
export async function LocaleShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: "en" | "ar";
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-200">
      <SiteHeader locale={locale} />
      <div className="flex-1">{children}</div>
      <SiteFooter locale={locale} />
    </div>
  );
}
