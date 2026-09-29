"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Compass, Users } from "lucide-react";

type Locale = "ar" | "en";

const CONTENT = {
  ar: {
    badge: "خطأ 404",
    title: "هذه الصفحة خرجت عن الموجز",
    description: "قد يكون الرابط معطلاً أو أن الصفحة انتقلت إلى عنوان آخر.",
    home: "الرئيسية",
    creators: "صناع المحتوى",
    contact: "تواصل مع الاستوديو",
  },
  en: {
    badge: "Error 404",
    title: "This page went off-brief",
    description: "The link may be broken or the page may have moved.",
    home: "Home",
    creators: "Creators",
    contact: "Contact the studio",
  },
};

export default function RootNotFound() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get locale from query parameter (?lang=ar or ?locale=ar)
  const queryLocale = searchParams.get("lang") || searchParams.get("locale");

  // 2. Fallback: Check if the pathname starts with /ar or /en
  const pathLocale = pathname.split("/")[1];

  // 3. Resolve active locale (defaulting to 'ar')
  const locale: Locale =
    queryLocale === "en" || pathLocale === "en" ? "en" : "ar";

  const isRtl = locale === "ar";
  const t = CONTENT[locale];

  // Helper to append locale prefix to links
  const getLocalizedHref = (path: string) => {
    return `/${locale}${path === "/" ? "" : path}`;
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden px-5 py-24 lg:px-8"
    >
      <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          <Compass className="size-3.5" />
          {t.badge}
        </p>

        <h1 className="text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tight text-primary/15 select-none">
          404
        </h1>

        <h2 className="-mt-4 text-3xl font-black tracking-tight text-accent-foreground sm:text-4xl">
          {t.title}
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          {t.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={getLocalizedHref("/")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
          >
            {t.home}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
          <Link
            href={getLocalizedHref("/creators")}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            <Users className="size-4" />
            {t.creators}
          </Link>
        </div>

        <Link
          href={getLocalizedHref("/contact")}
          className="mt-7 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
        >
          {t.contact}
        </Link>
      </div>
    </div>
  );
}