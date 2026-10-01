"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Lightbulb,
  Scissors,
  Send,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const timelineIcons = [Lightbulb, Users, Camera, Scissors, Send];

export function AboutWorkflow({
  title,
  liveLabel,
  description,
  pipelineLabel,
  timelineItems,
}: {
  title: string;
  liveLabel: string;
  description: string;
  pipelineLabel: string;
  timelineItems: string[];
}) {
  return (
    <motion.section variants={itemVariants} className="px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-primary">
          {title}
        </p>

        <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <Badge
                variant="secondary"
                className="gap-2 border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500"
              >
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                {liveLabel}
              </Badge>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {pipelineLabel}
            </span>
          </div>

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
                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4" />
                    </div>

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
    </motion.section>
  );
}
