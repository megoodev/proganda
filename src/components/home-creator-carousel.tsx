"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Creator } from "@/lib/data";
import { cn } from "@/lib/utils";

export function HomeCreatorCarousel({
  creators,
  viewsLabel,
  locale,
}: {
  creators: Creator[];
  viewsLabel: string;
  locale: "ar" | "en";
}) {
  const cards = [...creators, ...creators];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDirection, setActiveDirection] = useState<"previous" | "next">(
    "next",
  );
  const [isPaused, setIsPaused] = useState(false);
  const animationDelay = `${-(activeIndex * (32 / creators.length))}s`;

  useEffect(() => {
    if (isPaused) return;

    const stepDuration = 32000 / creators.length;
    const interval = window.setInterval(() => {
      setActiveDirection("next");
      setActiveIndex((current) => (current + 1) % creators.length);
    }, stepDuration);

    return () => window.clearInterval(interval);
  }, [creators.length, isPaused]);

  function move(direction: "previous" | "next") {
    setActiveDirection(direction);
    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % creators.length
        : (current - 1 + creators.length) % creators.length,
    );
  }

  return (
    <div className="creator-carousel" aria-label="Top creators">
      <div
        className="creator-carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className={cn(
            "creator-carousel-track",
            locale === "ar" ? "ar-animation" : "en-animation",
          )}
          style={{ animationDelay }}
        >
          {cards.map((creator, index) => (
            <Link
              href={`/creators/${creator.id}`}
              key={`${creator.id}-${index}`}
              aria-hidden={index >= creators.length}
              tabIndex={index >= creators.length ? -1 : undefined}
              className="creator-carousel-card group relative h-90 overflow-hidden bg-[#171717] sm:h-100"
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={creator.image}
                  alt={index >= creators.length ? "" : creator.name}
                  className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <span className="mb-3 block text-[10px] font-black tracking-[0.2em] text-white/45">
                    0{(index % creators.length) + 1} / ROSTER
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: creator.accent }}
                  >
                    {creator.niche}
                  </span>
                  <h3 className="mt-2 text-2xl font-black">{creator.name}</h3>
                  <p className="text-sm text-white/55">
                    {creator.reach} {viewsLabel}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="creator-carousel-controls mt-5"
        aria-label="Choose creator"
      >
        <button
          type="button"
          aria-label="Previous creator"
          onClick={() => move("previous")}
          className="creator-carousel-arrow creator-carousel-arrow--previous"
        >
          <ArrowLeft className="size-5 " />
        </button>

        <div className="creator-carousel-dots flex items-center justify-center gap-2">
          {creators.map((creator, index) => (
            <button
              key={creator.id}
              type="button"
              aria-label={`Show ${creator.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => {
                setActiveDirection(index < activeIndex ? "previous" : "next");
                setActiveIndex(index);
              }}
              className={`creator-carousel-dot ${activeIndex === index ? "is-active" : ""} ${activeDirection === "previous" && activeIndex === index ? "creator-carousel-dot--previous" : ""}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next creator"
          onClick={() => move("next")}
          className="creator-carousel-arrow creator-carousel-arrow--next"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
