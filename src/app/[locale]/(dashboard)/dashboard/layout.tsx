import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function DashboardLocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const isRtl = locale === "ar";

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        lang={locale}
        dir={isRtl ? "rtl" : "ltr"}
        className="min-h-svh w-full bg-background text-foreground antialiased"
      >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}