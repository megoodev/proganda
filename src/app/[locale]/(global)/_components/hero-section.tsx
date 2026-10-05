"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { heroImages } from "@/features/home/hero-images";
import { HeroSlideCard, type HeroSlide } from "./hero-slide-card";
import { HeroSlideDots } from "./hero-slide-dots";

const AUTOPLAY_MS = 5000;

export function HeroSection() {
  const t = useTranslations("home");
  // Slides come from the translation file, so images can never outnumber the text.
  const content = t.raw("heroSlides") as Omit<HeroSlide, "url">[];
  const slides: HeroSlide[] = content.map((item, i) => ({
    ...item,
    url: heroImages[i % heroImages.length],
  }));

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section className="relative isolate min-h-[90vh] w-full overflow-hidden bg-background px-4 py-16 lg:px-12 lg:py-24">
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 start-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-10 end-10 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start lg:col-span-6">
            <Badge
              variant="secondary"
              className="mb-6 gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md"
            >
              <Sparkles className="size-3.5" />
              {t("eyebrow")}
            </Badge>

            <h1 className="text-balance text-4xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary: bloggers (main audience). Adjust the href to your signup route. */}
              <Button
                asChild
                size="lg"
                className="group rounded-xl px-7 font-semibold shadow-lg shadow-primary/25"
              >
                <Link href="/signup?type=blogger" className="flex items-center gap-2">
                  {t("primaryCta")}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>

              {/* Secondary: brands */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-border/80 bg-background/60 backdrop-blur-md hover:bg-accent"
              >
                <Link href="/start-project" className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  {t("secondaryCta")}
                </Link>
              </Button>
            </div>

            <div className="mt-12 w-full pt-6">
              <Separator className="mb-6 bg-border/60" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("featuredHighlights")}
              </p>
              <HeroSlideDots
                count={slides.length}
                active={active}
                onSelect={(index) => {
                  setActive(index);
                  setPaused(true);
                }}
              />
            </div>
          </div>

          <div
            className="w-full lg:col-span-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            <HeroSlideCard
              slides={slides}
              active={active}
              onPrev={() => setActive((p) => (p - 1 + slides.length) % slides.length)}
              onNext={() => setActive((p) => (p + 1) % slides.length)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
