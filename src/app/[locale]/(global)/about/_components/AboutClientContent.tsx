"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Eye,
  Heart,
  Lightbulb,
  MessageSquare,
  Scissors,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface AboutClientContentProps {
  t: {
    eyebrow: string;
    title: string;
    description: string;
    capabilityMeta: string;
    metrics: string;
    studio: string;
    studioDescription: string;
    timeline: string;
  };
  metricsData: Array<[string, string]>;
  timelineItems: string[];
}

export function AboutClientContent({
  t,
  metricsData,
  timelineItems,
}: AboutClientContentProps) {
  const timelineIcons = [Lightbulb, Users, Camera, Scissors, Send];

  const capabilities = [
    {
      icon: Lightbulb,
      label: "Creative strategy",
      accent: "text-sky-500",
      bgAccent: "bg-sky-500/10",
    },
    {
      icon: Camera,
      label: "Studio production",
      accent: "text-indigo-500",
      bgAccent: "bg-indigo-500/10",
    },
    {
      icon: Scissors,
      label: "Edit + post",
      accent: "text-purple-500",
      bgAccent: "bg-purple-500/10",
    },
    {
      icon: Clapperboard,
      label: "Distribution",
      accent: "text-cyan-500",
      bgAccent: "bg-cyan-500/10",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-20 lg:space-y-28"
    >
      {/* 1. HERO SECTION WITH MARKETING CONTENT CANVAS */}
      <section className="relative border-b border-border/60 px-6 py-16 lg:px-8 lg:py-24">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Text */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-3.5 animate-pulse" />
              {t.eyebrow}
            </Badge>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t.description}
            </p>

            {/* Quick Live Stats Pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-500">
                <span className="size-2 animate-ping rounded-full bg-emerald-500" />
                Real-Time Campaign Tracking
              </div>
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                <Zap className="size-3.5" />
                100% Creator Managed
              </div>
            </div>
          </motion.div>

          {/* Right Content Studio Card / Animated Live Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative lg:col-span-5"
          >
            {/* Floating Metric 1 */}
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
                  Avg. ROI
                </p>
                <p className="text-sm font-black text-emerald-500">+480% Growth</p>
              </div>
            </motion.div>

            {/* Floating Metric 2 */}
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
                  Active Reach
                </p>
                <p className="text-sm font-black text-primary">54M+ Views</p>
              </div>
            </motion.div>

            {/* Main Interactive Studio Display Card */}
            <Card className="relative overflow-hidden border border-border/80 bg-card/80 p-6 shadow-2xl backdrop-blur-xl">
              <CardHeader className="border-b border-border/60 p-0 pb-4">
                <CardTitle className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-primary">
                  <span className="flex items-center gap-2">
                    <WandSparkles className="size-4" />
                    {t.capabilityMeta}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Content Engine
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 p-0 pt-6">
                {capabilities.slice(0, 4).map(({ icon: Icon, label, accent }, index) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 6, scale: 1.02 }}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 p-3.5 transition-colors hover:border-primary/50 hover:bg-accent/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black ${accent}`}>
                        0{index + 1}
                      </span>
                      <div className={`flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background ${accent}`}>
                        <Icon className="size-4.5" />
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {label}
                      </span>
                    </div>

                    {/* Social Stats Simulated Badges */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {index === 0 && <Heart className="size-3.5 fill-red-500 text-red-500" />}
                      {index === 1 && <MessageSquare className="size-3.5 text-sky-500" />}
                      {index === 2 && <Share2 className="size-3.5 text-purple-500" />}
                      {index === 3 && <Sparkles className="size-3.5 text-amber-500" />}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 2. METRICS SHOWCASE SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.p
          variants={itemVariants}
          className="mb-6 text-xs font-black uppercase tracking-widest text-primary"
        >
          {t.metrics}
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metricsData.map(([value, label]) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="group border-border/60 bg-card/60 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="p-0">
                  <p className="text-4xl font-black text-primary transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CAPABILITIES GRID SECTION */}
      <section className="relative rounded-3xl bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <motion.div variants={itemVariants}>
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-primary">
              {t.studio}
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
              {t.studioDescription}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, label, accent, bgAccent }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Card className="group border-border/60 bg-card/80 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <CardContent className="flex flex-col items-start p-0">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${bgAccent} ${accent} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-foreground">
                      {label}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW TIMELINE SECTION */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={itemVariants}
            className="mb-4 text-xs font-black uppercase tracking-widest text-primary"
          >
            {t.timeline}
          </motion.p>

          <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Board Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
              <div>
                <Badge
                  variant="secondary"
                  className="gap-2 border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500"
                >
                  <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                  campaign signal / live
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  One connected team from brief to broadcast.
                </p>
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                100% In-House Pipeline
              </span>
            </div>

            {/* Steps Track */}
            <div className="relative mt-10">
              <div className="absolute left-6 right-6 top-5 hidden h-0.5 bg-border/80 md:block" />

              <div className="grid gap-6 md:grid-cols-5 md:gap-3">
                {timelineItems.map((item, index) => {
                  const Icon = timelineIcons[index] || Lightbulb;
                  return (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="group relative flex items-center gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 transition-all duration-300 hover:border-primary/50 md:flex-col md:items-center md:border-0 md:bg-transparent md:p-0 md:text-center"
                    >
                      {/* Step Circle */}
                      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-4" />
                      </div>

                      {/* Content */}
                      <div className="md:mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                          0{index + 1}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-foreground">
                          {item}
                        </h3>
                      </div>

                      <ArrowRight className="ml-auto size-4 text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-1 md:mx-auto md:mt-4 md:rotate-0 rtl:rotate-180" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}