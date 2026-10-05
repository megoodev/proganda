"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Layers, WandSparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WorkflowStep, type PipelineStep } from "./workflow-step";

const ease = [0.16, 1, 0.3, 1] as const;

// `custom` is the horizontal offset, so the entrance direction follows RTL/LTR
const columnVariants: Variants = {
  hidden: (x: number) => ({ opacity: 0, x }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease, staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease, delay: 0.2 } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, delay: 0.6, ease: "easeInOut" } },
};

export function WorkflowSection() {
  const t = useTranslations("home");
  const isRtl = useLocale() === "ar";
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const steps = t.raw("pipelineSteps") as PipelineStep[];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 px-6 py-20 lg:px-8 lg:py-28"
    >
      <motion.div
        className="pointer-events-none absolute -top-24 -start-24 -z-10 size-96 rounded-full bg-primary/15 blur-3xl"
        animate={reduceMotion ? undefined : { x: ["0%", "30%"], y: ["0%", "20%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <motion.div
          className="lg:col-span-5"
          custom={isRtl ? 40 : -40}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={columnVariants}
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Layers className="size-3.5" />
              {t("workflowEyebrow")}
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl"
          >
            {t("workflowTitle")}
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t("workflowDescription")}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              asChild
              variant="outline"
              className="group mt-8 gap-2 rounded-xl border-border/80 font-bold hover:border-primary"
            >
              <Link href="/about">
                {t("aboutCta")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <CardHeader className="p-0 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                    <WandSparkles className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {t("livePipeline")}
                    </p>
                    <p className="text-base font-bold text-foreground">{t("reel")}</p>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="gap-2 border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500"
                >
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {t("studioLive")}
                </Badge>
              </div>
            </CardHeader>

            <Separator className="bg-border/60" />

            <CardContent className="p-0 pt-10">
              <div className="relative">
                <motion.div
                  className="absolute inset-x-4 top-5 h-0.5 origin-left bg-border sm:inset-x-6 rtl:origin-right"
                  variants={lineVariants}
                />
                <div className="relative z-10 grid grid-cols-5 gap-2">
                  {steps.map((step, index) => (
                    <WorkflowStep
                      key={step.num}
                      step={step}
                      index={index}
                      isCompleted={index === steps.length - 1}
                    />
                  ))}
                </div>
              </div>

              <Separator className="mt-10 bg-border/60" />

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold">{t("oneSharpTeam")}</span>
                <span className="font-bold text-primary">{t("inHouseProduction")}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
