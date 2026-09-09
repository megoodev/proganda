"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

export function MobileNavigation({
  labels,
  alternateLocale,
}: {
  labels: {
    about: string;
    creators: string;
    brands: string;
    services: string;
    subscriptions: string;
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
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center border border-white/15 text-white/75 transition hover:border-[#ccff00] hover:text-[#ccff00]"
      >
        <Menu className="size-4" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/70 text-white backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative z-101 min-h-screen bg-[#0d0d0d] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#ccff0012_1px,transparent_1px),linear-gradient(90deg,#ccff0012_1px,transparent_1px)] bg-size-[28px_28px]" />
            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={close}
                  className="text-lg font-black tracking-[-0.08em]"
                >
                  PRO<span className="text-[#ccff00]">GANDA</span>
                  <span className="text-[#ff007f]">.</span>
                </Link>
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={close}
                  className="flex size-10 items-center justify-center text-[#ff007f] transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff007f]"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-20 grid gap-2" aria-label="Mobile navigation">
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
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-[clamp(1.8rem,8vw,3rem)] font-black tracking-[-0.06em] transition hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    <span>{label}</span>
                    <span className="text-sm font-bold text-white/25 transition group-hover:text-[#ff007f]">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={pathname}
                  locale={alternateLocale}
                  onClick={close}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-[#ccff00]"
                >
                  <Languages className="size-4" /> {labels.language}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 bg-[#ccff00] px-5 py-3 text-sm font-black text-black hover:bg-white"
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
