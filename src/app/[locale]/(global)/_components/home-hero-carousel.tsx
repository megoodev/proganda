"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Zap 
} from "lucide-react";
import { Link } from "@/i18n/navigation";

// Importing shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

const showcases = [
  {
    id: 1,
    url: "/assits/backgrounds/background-2.jpg",
    category: "Design System",
    title: "Next-Gen User Interfaces",
    description: "Crafted with precision using modern Tailwind CSS and Next.js.",
  },
  {
    id: 2,
    url: "/assits/backgrounds/background-1.jpg",
    category: "AI & Tech",
    title: "Automated Workflows",
    description: "Empower your creative process with integrated smart tools.",
  },
  {
    id: 3,
    url: "/assits/backgrounds/background.3.jpg",
    category: "Architecture",
    title: "Scalable Infrastructure",
    description: "High performance architecture optimized for full-stack apps.",
  },
  {
    id: 4,
    url: "/assits/backgrounds/background-4.jpg",
    category: "Analytics",
    title: "Real-time Metrics",
    description: "Track performance and user engagement in a unified dashboard.",
  },
  {
    id: 5,
    url: "/assits/backgrounds/background-5.jpeg",
    category: "Analytics",
    title: "Real-time Metrics",
    description: "Track performance and user engagement in a unified dashboard.",
  },
];

export function HomeHeroCarousel({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = showcases[activeSlide];

  return (
    <section className="relative isolate min-h-[90vh] w-full overflow-hidden bg-background px-4 py-16 lg:px-12 lg:py-24">
      {/* Background Decorative Gradients & Grid Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 left-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-blue-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Hero Content */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6">
            <Badge 
              variant="secondary" 
              className="mb-6 gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md"
            >
              <Sparkles className="size-3.5" />
              {eyebrow}
            </Badge>

            <h1 className="text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>

            <p className="mt-6 text-balance text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="group rounded-xl px-7 font-semibold shadow-lg shadow-primary/25">
                <Link href="/creators" className="flex items-center gap-2">
                  {primaryCta}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-xl border-border/80 bg-background/60 backdrop-blur-md hover:bg-accent">
                <Link href="/services" className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  {secondaryCta}
                </Link>
              </Button>
            </div>

            {/* Slide Selector Controls */}
            <div className="mt-12 w-full pt-6">
              <Separator className="mb-6 bg-border/60" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Featured Highlights
              </p>
              <div className="grid grid-cols-5 gap-2">
                {showcases.map((item, idx) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveSlide(idx);
                      setIsPaused(true);
                    }}
                    className={`group relative h-1.5 p-0 overflow-hidden rounded-full transition-all duration-300 ${
                      idx === activeSlide ? "bg-primary" : "bg-muted hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`Select slide ${idx + 1}`}
                  >
                    {idx === activeSlide && !isPaused && (
                      <span className="absolute inset-0 bg-primary-foreground/40 animate-pulse" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div 
            className="w-full lg:col-span-6 xl:col-span-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-2 shadow-2xl backdrop-blur-xl">
              <AspectRatio ratio={4 / 3} className="relative w-full overflow-hidden rounded-2xl bg-muted">
                {showcases.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeSlide
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-105 z-0"
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent z-10" />
                  </div>
                ))}

                {/* Overlay Floating Content Card */}
                <Card className="absolute bottom-4 left-4 right-4 z-20 border border-white/10 bg-black/50 p-4 backdrop-blur-md shadow-none">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Badge variant="outline" className="border-primary/40 bg-primary/20 text-[10px] text-primary-foreground">
                        {currentItem.category}
                      </Badge>
                      <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                        {currentItem.title}
                      </h3>
                      <p className="hidden text-xs text-white/70 sm:block">
                        {currentItem.description}
                      </p>
                    </div>

                    {/* Nav Navigation Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setActiveSlide((prev) => (prev - 1 + showcases.length) % showcases.length)
                        }
                        className="h-9 w-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      >
                        <ChevronLeft className="size-4 rtl:rotate-180" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setActiveSlide((prev) => (prev + 1) % showcases.length)
                        }
                        className="h-9 w-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      >
                        <ChevronRight className="size-4 rtl:rotate-180" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </AspectRatio>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}