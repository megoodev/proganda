"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Creator } from "@/lib/data";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const slideVariants: Variants = {
  initial: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4 },
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  }),
};

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
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const isRtl = locale === "ar";

  useEffect(() => {
    if (isPaused || !creators.length) return;

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % creators.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [creators.length, isPaused]);

  function handlePrev() {
    setDirection(-1);
    setActiveIndex(
      (current) => (current - 1 + creators.length) % creators.length
    );
  }

  function handleNext() {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % creators.length);
  }

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchStartY.current = clientY;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchEndY.current = clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    const distance = touchStartY.current - touchEndY.current;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    if (isSwipeUp) {
      handleNext();
    } else if (isSwipeDown) {
      handlePrev();
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  if (!creators || creators.length === 0) return null;

  const currentCreator = creators[activeIndex];

  return (
    <div
      className="relative w-full overflow-hidden px-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 lg:items-center">
          <div className="flex justify-center lg:col-span-7 xl:col-span-8">
            <Card
              className="relative w-full max-w-xs cursor-grab select-none overflow-hidden rounded-[2.5rem] border-4 border-border/80 bg-black shadow-2xl backdrop-blur-xl active:cursor-grabbing sm:max-w-sm"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
            >
              <CardContent className="p-0">
                <div className="aspect-9/16 relative w-full overflow-hidden bg-black">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentCreator.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 h-full w-full"
                    >
                      <Image
                        src={currentCreator.image}
                        alt={currentCreator.name}
                        fill
                        priority
                        sizes="(max-width: 640px) 320px, 384px"
                        className="object-cover"
                      />
                      <div className="bg-linear-to-t absolute inset-0 from-black/90 via-black/20 to-transparent" />

                      <div className="absolute bottom-24 inset-e-4 z-20 flex flex-col items-center gap-4 text-white">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="group flex flex-col items-center gap-1"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white"
                          >
                            <Heart className="size-5 fill-white/20 text-white group-hover:fill-red-500 group-hover:text-red-500" />
                          </Button>
                          <span className="text-[10px] font-semibold">
                            24.5k
                          </span>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="group flex flex-col items-center gap-1"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white"
                          >
                            <Bookmark className="size-5 text-white" />
                          </Button>
                          <span className="text-[10px] font-semibold">
                            Save
                          </span>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="group flex flex-col items-center gap-1"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white"
                          >
                            <Share2 className="size-5 text-white" />
                          </Button>
                          <span className="text-[10px] font-semibold">
                            Share
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="absolute inset-x-0 bottom-0 z-20 p-6 pe-16"
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Badge
                            className="border-none text-[11px] font-semibold uppercase tracking-wider text-white shadow-md"
                            style={{
                              backgroundColor:
                                currentCreator.accent || "var(--primary)",
                            }}
                          >
                            <Sparkles className="me-1 size-3" />
                            {currentCreator.niche}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-white/20 bg-black/40 text-[11px] text-white/80 backdrop-blur-md"
                          >
                            <Eye className="me-1 size-3 text-primary" />
                            {currentCreator.reach} {viewsLabel}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-extrabold tracking-tight text-white">
                          {currentCreator.name}
                        </h3>

                        <div className="mt-4 flex items-center gap-3">
                          <Button
                            asChild
                            size="sm"
                            className="w-full rounded-xl font-bold shadow-lg transition-transform active:scale-95"
                          >
                            <Link href={`/creators/${currentCreator.id}`}>
                              {locale === "ar"
                                ? "عرض الملف الشخصي"
                                : "View Profile"}
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                0{activeIndex + 1} / 0{creators.length} —{" "}
                {locale === "ar" ? "القائمة" : "ROSTER"}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isRtl ? handleNext : handlePrev}
                  className="h-9 w-9 rounded-full border-border/80 bg-background/60 shadow-sm backdrop-blur-md hover:bg-accent active:scale-90"
                  aria-label="Previous creator"
                >
                  <ArrowLeft className="size-4 rtl:rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isRtl ? handlePrev : handleNext}
                  className="h-9 w-9 rounded-full border-border/80 bg-background/60 shadow-sm backdrop-blur-md hover:bg-accent active:scale-90"
                  aria-label="Next creator"
                >
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {creators.map((creator, index) => {
                const isActive = index === activeIndex;
                return (
                  <Button
                    key={creator.id}
                    variant="ghost"
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={cn(
                      "group relative flex h-auto w-full items-center justify-start gap-4 whitespace-normal rounded-2xl border p-3.5 text-start transition-all duration-300 hover:bg-accent/40",
                      isActive
                        ? "border-primary/50 bg-primary/10 shadow-md backdrop-blur-md hover:bg-primary/15"
                        : "border-border/40 bg-card/40 hover:border-border"
                    )}
                  >
                    <Avatar className="h-12 w-12 shrink-0 rounded-xl border border-border/60 transition-transform group-hover:scale-105">
                      <AvatarImage
                        src={creator.image}
                        alt={creator.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {creator.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={cn(
                            "truncate text-sm font-bold",
                            isActive ? "text-primary" : "text-foreground"
                          )}
                        >
                          {creator.name}
                        </h4>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider"
                          style={{ color: creator.accent }}
                        >
                          {creator.niche}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                        {creator.reach} {viewsLabel}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="inset-s-1 absolute inset-y-2 w-1 rounded-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}