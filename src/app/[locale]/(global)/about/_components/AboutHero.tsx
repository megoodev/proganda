"use client";

import { motion, type Variants } from "framer-motion";
import {
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Sparkles,
  TrendingUp,
  WandSparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutCapability, AboutCopy } from "./about-types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const activityIcons = [Heart, MessageSquare, Share2, Sparkles];

export function AboutHero({
  copy,
  capabilities,
}: {
  copy: AboutCopy;
  capabilities: AboutCapability[];
}) {
  return (
    <section className="relative border-b border-border/60 px-6 py-16 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <Badge
            variant="outline"
            className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Sparkles className="size-3.5 animate-pulse" />
            {copy.eyebrow}
          </Badge>

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-500">
              <span className="size-2 animate-ping rounded-full bg-emerald-500" />
              {copy.trackingLive}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Zap className="size-3.5" />
              {copy.creatorManaged}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative lg:col-span-5">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute -top-6 -s-6 z-20 hidden rounded-2xl border border-emerald-500/30 bg-card/90 p-3 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground">
                {copy.averageRoi}
              </p>
              <p className="text-sm font-black text-emerald-500">
                {copy.growth}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute -bottom-6 -e-6 z-20 hidden rounded-2xl border border-primary/30 bg-card/90 p-3 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Eye className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground">
                {copy.activeReach}
              </p>
              <p className="text-sm font-black text-primary">
                54M+ {copy.viewsCount}
              </p>
            </div>
          </motion.div>

          <Card className="relative overflow-hidden border border-border/80 bg-card/80 p-6 shadow-2xl backdrop-blur-xl">
            <CardHeader className="border-b border-border/60 p-0 pb-4">
              <CardTitle className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-widest text-primary">
                <span className="flex items-center gap-2">
                  <WandSparkles className="size-4 shrink-0" />
                  {copy.capabilityMeta}
                </span>
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {copy.contentEngine}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3 p-0 pt-6">
              {capabilities
                .slice(0, 4)
                .map(({ icon: Icon, label, accent }, index) => {
                  const ActivityIcon = activityIcons[index];

                  return (
                    <motion.div
                      key={label}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-muted/20 p-3.5 transition-colors hover:border-primary/50 hover:bg-accent/40"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className={`text-xs font-black ${accent}`}>
                          0{index + 1}
                        </span>
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background ${accent}`}
                        >
                          <Icon className="size-4.5" />
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {label}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
                        <ActivityIcon className="size-3.5" />
                      </div>
                    </motion.div>
                  );
                })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
