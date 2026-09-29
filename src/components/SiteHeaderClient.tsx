"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowUpRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Button } from "@/components/ui/button";

export type MobileLabels = {
  about: string;
  creators: string;
  brands: string;
  services: string;
  contact: string;
  register: string;
  language: string;
};

type HeaderProps = {
  locale: "en" | "ar";
  brandFirstPart: string;
  brandSecondPart: string;
  navItems: { href: string; label: string }[];
  registerLabel: string;
  languageLabel: string;
  alternateLocale: "en" | "ar";
  mobileLabels: MobileLabels;
};

export function SiteHeaderClient({
  locale,
  brandFirstPart,
  brandSecondPart,
  navItems,
  registerLabel,
  languageLabel,
  alternateLocale,
  mobileLabels,
}: HeaderProps) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo with Animation */}
        <Link
          href="/"
          className="group relative flex items-center gap-1.5 text-xl sm:text-2xl font-black tracking-tighter transition-transform active:scale-95"
        >
          <span className="text-foreground">{brandFirstPart}</span>
          <span className="text-primary">{brandSecondPart}</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-primary inline-block text-2xl leading-none"
          >
            .
          </motion.span>
        </Link>

        {/* Desktop Navigation with Floating Pill Effect */}
        <div
          className="hidden items-center gap-1 rounded-full border border-border/40 bg-card/40 p-1.5 backdrop-blur-md md:flex"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                className="relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                style={{
                  color:
                    isActive || hoveredPath === item.href
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                }}
              >
                {(hoveredPath === item.href || (isActive && !hoveredPath)) && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 z-[-1] rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} label={languageLabel} />
          <MobileNavigation
            labels={mobileLabels}
            alternateLocale={alternateLocale}
          />
          <Button
            asChild
            size="sm"
            className="hidden font-bold sm:inline-flex rounded-xl shadow-md shadow-primary/20 gap-1.5 hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/auth/register">
              <UserPlus className="size-4" />
              <span>{registerLabel}</span>
              <ArrowUpRight className="size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
