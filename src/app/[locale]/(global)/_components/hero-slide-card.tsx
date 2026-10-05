import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export type HeroSlide = {
  category: string;
  title: string;
  description: string;
  url: string;
};

type Props = {
  slides: HeroSlide[];
  active: number;
  onPrev: () => void;
  onNext: () => void;
};

export function HeroSlideCard({ slides, active, onPrev, onNext }: Props) {
  const t = useTranslations("home");
  const current = slides[active];
  if (!current) return null;

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-2 shadow-2xl backdrop-blur-xl">
      <AspectRatio ratio={4 / 3} className="relative w-full overflow-hidden rounded-2xl bg-muted">
        {slides.map((slide, index) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === active ? "z-10 scale-100 opacity-100" : "z-0 scale-105 opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
          </div>
        ))}

        <Card
          className="absolute inset-x-4 bottom-4 z-20 border border-white/10 bg-black/50 p-4 shadow-none backdrop-blur-md"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="border-primary/40 bg-primary/20 text-[10px] text-primary-foreground"
              >
                {current.category}
              </Badge>
              <h3 className="mt-1 text-base font-bold text-white sm:text-lg">{current.title}</h3>
              <p className="hidden text-xs text-white/70 sm:block">{current.description}</p>
            </div>

            {/* The layout flips by itself in RTL, so no handler swapping is needed */}
            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrev}
                aria-label={t("previousSlide")}
                className="size-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                aria-label={t("nextSlide")}
                className="size-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </Card>
      </AspectRatio>
    </Card>
  );
}
