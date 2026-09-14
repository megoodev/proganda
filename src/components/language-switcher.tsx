"use client";

import { Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "./ui/button";

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
      className={buttonVariants({
        variant: "outline",
        className: "rounded-sm border-accent-foreground text-accent-foreground ms-2",
      })}
    >
      <Languages className="size-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
