"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Creator } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const slideVariants: Variants = {
  initial: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
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
    transition: { y: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } },
  }),
};

type Props = {
  creator: Creator;
  name: string;
  niche: string;
  direction: number;
};

export function CreatorSlide({ creator, name, niche, direction }: Props) {
  const t = useTranslations("common");
  const tHome = useTranslations("home");

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 size-full"
    >
      {/* No `priority`: this section is below the fold */}
      <Image
        src={creator.image}
        alt={name}
        fill
        sizes="(max-width: 640px) 320px, 384px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-20 p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            className="border-none text-[11px] font-semibold uppercase tracking-wider text-white shadow-md"
            style={{ backgroundColor: creator.accent || "var(--primary)" }}
          >
            <Sparkles className="me-1 size-3" />
            {niche}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/20 bg-black/40 text-[11px] text-white/80 backdrop-blur-md"
          >
            <Eye className="me-1 size-3 text-primary" />
            {creator.reach} {tHome("views")}
          </Badge>
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-white">{name}</h3>

        <Button asChild size="sm" className="mt-4 w-full rounded-xl font-bold">
          <Link href={`/creators/${creator.id}`}>{t("profile")}</Link>
        </Button>
      </div>
    </motion.div>
  );
}
