"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";

export function MobileNavigation({
  labels,
  alternateLocale,
}: {
  labels: {
    about: string;
    creators: string;
    brands: string;
    services: string;
    contact: string;
    register: string;
    language: string;
  };
  alternateLocale: "en" | "ar";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close the navigation drawer on route change without triggering the "set state in effect" lint rule
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        variant='outline'
        size='icon-lg'
        className="rounded-sm"
      >
        <Menu className="size-4 text-accent-foreground border-accent-foreground" />
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/70 text-white backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative z-101 min-h-screen bg-[#0d0d0d] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#3AA7FD12_1px,transparent_1px),linear-gradient(90deg,#3AA7FD12_1px,transparent_1px)] bg-size-[28px_28px]" />
            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={close}
                  className="text-lg font-black tracking-[-0.08em]"
                >
                  <span className="text-accent-foreground">Pro</span>
                  <span className="text-[#3AA7FD]">Ganda</span>
                  <span className="text-[#1B449A]">.</span>
                </Link>
                <Button
                  type="button"
                  size="icon-lg"
                  variant="ghost"
                  aria-label="Close navigation"
                  onClick={close}
                >
                  <X className="size-5 text-destructive" />
                </Button>
              </div>
              <nav className="mt-10 grid gap-1" aria-label="Mobile navigation">
                {[
                  ["/about", labels.about],
                  ["/creators", labels.creators],
                  ["/brands", labels.brands],
                  ["/services", labels.services],
                  ["/contact", labels.contact],
                ].map(([href, label], index) => (
                  <Link
                    key={href}
                    href={href as "/about"}
                    onClick={close}
                    className="group flex items-center justify-between border-b border-white/10 py-2 text-[clamp(1.8rem,8vw,3rem)] font-black tracking-[-0.06em] transition hover:border-[#3AA7FD] hover:text-[#3AA7FD] text-accent-foreground"
                  >
                    <span>{label}</span>
                    <Badge variant="outline" className="rounded-sm ">
                      0{index + 1}
                    </Badge>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={pathname}
                  locale={alternateLocale}
                  onClick={close}
                  className={buttonVariants({
                    variant: "secondary",
                    className: "rounded-sm py-5",
                  })}
                >
                  <Languages className="size-4" /> {labels.language}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={close}
                  className={buttonVariants({ className: "rounded-sm py-5" })}
                >
                  {labels.register} <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
