"use client";

import { Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: "en" | "ar";
  label: string;
}) {
  const pathname = usePathname();
  const alternate = locale === "en" ? "ar" : "en";

  return (
    <Link
      href={pathname}
      locale={alternate}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center gap-2 border border-white/15 px-0 text-xs font-bold text-white/70 transition hover:border-[#3AA7FD] hover:text-[#3AA7FD] sm:h-auto sm:w-auto sm:px-3 sm:py-2"
    >
      <Languages className="size-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
