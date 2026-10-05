"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Creator } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Props = {
  creator: Creator;
  name: string;
  niche: string;
  isActive: boolean;
  onSelect: () => void;
};

export function CreatorListItem({ creator, name, niche, isActive, onSelect }: Props) {
  const tHome = useTranslations("home");

  return (
    <Button
      variant="ghost"
      onClick={onSelect}
      aria-current={isActive}
      className={cn(
        "group relative flex h-auto w-full items-center justify-start gap-4 whitespace-normal rounded-2xl border p-3.5 text-start transition-all duration-300 hover:bg-accent/40",
        isActive
          ? "border-primary/50 bg-primary/10 shadow-md hover:bg-primary/15"
          : "border-border/40 bg-card/40 hover:border-border",
      )}
    >
      <Avatar className="size-12 shrink-0 rounded-xl border border-border/60">
        <AvatarImage src={creator.image} alt={name} className="object-cover" />
        <AvatarFallback className="text-xs font-bold">{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn("truncate text-sm font-bold", isActive ? "text-primary" : "text-foreground")}>
            {name}
          </h4>
          <span
            className="text-[10px] font-extrabold uppercase tracking-wider"
            style={{ color: creator.accent }}
          >
            {niche}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
          {creator.reach} {tHome("views")}
        </p>
      </div>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-y-2 start-1 w-1 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Button>
  );
}
