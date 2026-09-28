"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Creator } from "@/lib/data";
import { cn } from "@/lib/utils";

// Importing shadcn/ui primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HomeCreatorCarousel({
  creators,
  viewsLabel,
  locale,
}: {
  creators: Creator[];
  viewsLabel: string;
  locale: "ar" | "en";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isRtl = locale === "ar";

  useEffect(() => {
    if (isPaused || !creators.length) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % creators.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [creators.length, isPaused]);

  function handlePrev() {
    setActiveIndex((current) => (current - 1 + creators.length) % creators.length);
  }

  function handleNext() {
    setActiveIndex((current) => (current + 1) % creators.length);
  }

  if (!creators || creators.length === 0) return null;

  return (
    <div 
      className="relative w-full overflow-hidden px-2 py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Featured Active Creator Showcase */}
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          
          {/* Main Active Creator Card (Large View) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 to-muted/30 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                  {creators.map((creator, index) => (
                    <div
                      key={creator.id}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-in-out",
                        index === activeIndex
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-105 z-0"
                      )}
                    >
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <Badge
                            className="border-none text-xs font-semibold uppercase tracking-wider text-white shadow-md"
                            style={{ backgroundColor: creator.accent || "var(--primary)" }}
                          >
                            <Sparkles className="me-1.5 size-3" />
                            {creator.niche}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 bg-black/40 text-white/80 backdrop-blur-md">
                            <Eye className="me-1.5 size-3.5 text-primary" />
                            {creator.reach} {viewsLabel}
                          </Badge>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {creator.name}
                        </h3>

                        <div className="mt-4 flex items-center gap-3">
                          <Button asChild size="sm" className="rounded-xl px-5 font-bold shadow-lg">
                            <Link href={`/creators/${creator.id}`}>
                              {locale === "ar" ? "عرض الملف الشخصي" : "View Profile"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roster Thumbnails / Quick Select (Right Column) */}
          <div className="flex flex-col gap-3 lg:col-span-5 xl:col-span-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                0{activeIndex + 1} / 0{creators.length} — {locale === "ar" ? "القائمة" : "ROSTER"}
              </span>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isRtl ? handleNext : handlePrev}
                  className="h-9 w-9 rounded-full border-border/80 bg-background/60 shadow-sm backdrop-blur-md hover:bg-accent"
                  aria-label="Previous creator"
                >
                  <ArrowLeft className="size-4 rtl:rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isRtl ? handlePrev : handleNext}
                  className="h-9 w-9 rounded-full border-border/80 bg-background/60 shadow-sm backdrop-blur-md hover:bg-accent"
                  aria-label="Next creator"
                >
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>

            {/* List of Creator Items */}
            <div className="flex flex-col gap-2.5">
              {creators.map((creator, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={creator.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-2xl border p-3 text-start transition-all duration-300",
                      isActive
                        ? "border-primary/50 bg-primary/10 shadow-md backdrop-blur-md"
                        : "border-border/40 bg-card/40 hover:border-border hover:bg-accent/40"
                    )}
                  >
                    <Avatar className="h-12 w-12 rounded-xl border border-border/60">
                      <AvatarImage src={creator.image} alt={creator.name} className="object-cover" />
                      <AvatarFallback className="text-xs font-bold">
                        {creator.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={cn("truncate text-sm font-bold", isActive ? "text-primary" : "text-foreground")}>
                          {creator.name}
                        </h4>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: creator.accent }}>
                          {creator.niche}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {creator.reach} {viewsLabel}
                      </p>
                    </div>

                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute inset-y-2 start-1 w-1 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}