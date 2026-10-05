"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Creator } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreatorSlide } from "./creator-slide";
import { CreatorListItem } from "./creator-list-item";

const AUTOPLAY_MS = 4500;

export function CreatorCarousel({ creators }: { creators: Creator[] }) {
  const t = useTranslations("common");
  const tHome = useTranslations("home");
  const names = tHome.raw("creatorNames") as Record<string, string>;
  const niches = tHome.raw("niches") as Record<string, string>;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = creators.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const goPrev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + count) % count);
  };
  const goNext = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % count);
  };

  const current = creators[active];

  return (
    <div
      className="mx-auto grid max-w-7xl gap-10 px-2 lg:grid-cols-12 lg:items-center lg:gap-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex justify-center lg:col-span-7 xl:col-span-8">
        <Card className="relative w-full max-w-xs overflow-hidden rounded-[2.5rem] border-4 border-border/80 bg-black shadow-2xl sm:max-w-sm">
          <CardContent className="p-0">
            <div className="relative aspect-9/16 w-full overflow-hidden bg-black">
              <AnimatePresence initial={false} custom={direction}>
                <CreatorSlide
                  key={current.id}
                  creator={current}
                  name={names[current.id] ?? current.name}
                  niche={niches[current.niche] ?? current.niche}
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
            0{active + 1} / 0{count} — {t("roster")}
          </span>

          {/* The layout flips by itself in RTL: first button = previous in both directions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goPrev}
              aria-label={tHome("previousCreator")}
              className="size-9 rounded-full"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goNext}
              aria-label={tHome("nextCreator")}
              className="size-9 rounded-full"
            >
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {creators.map((creator, index) => (
            <CreatorListItem
              key={creator.id}
              creator={creator}
              name={names[creator.id] ?? creator.name}
              niche={niches[creator.niche] ?? creator.niche}
              isActive={index === active}
              onSelect={() => {
                setDirection(index > active ? 1 : -1);
                setActive(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
