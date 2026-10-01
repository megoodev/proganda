"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Layers, WandSparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

export interface PipelineStep {
  num: string;
  label: string;
  sub: string;
}

export interface WorkflowSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  aboutCta: string;
  reelLabel: string;
  livePipelineLabel: string;
  studioLiveLabel: string;
  teamLabel: string;
  productionLabel: string;
  pipelineSteps: PipelineStep[];
}

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      delay: 0.6,
      ease: "easeInOut",
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.7 + i * 0.12,
      duration: 0.5,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

export function WorkflowSection({
  eyebrow,
  title,
  description,
  aboutCta,
  reelLabel,
  livePipelineLabel,
  studioLiveLabel,
  teamLabel,
  productionLabel,
  pipelineSteps,
}: WorkflowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        x: "30%",
        y: "20%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          rotateX: -2,
          rotateY: 2,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 px-6 py-20 lg:px-8 lg:py-28"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Text Column */}
        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={leftColumnVariants}
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Layers className="size-3.5" />
              {eyebrow}
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-black tracking-tight text-foreground sm:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              asChild
              variant="outline"
              className="group mt-8 gap-2 rounded-xl border-border/80 font-bold hover:border-primary"
            >
              <Link href="/about">
                {aboutCta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Workflow Board Card */}
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <div ref={cardRef}>
            <Card className="relative overflow-hidden border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <CardHeader className="p-0 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.05 }}
                      className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    >
                      <WandSparkles className="size-5" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {livePipelineLabel}
                      </p>
                      <p className="text-base font-bold text-foreground">
                        {reelLabel}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="secondary"
                    className="gap-2 border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold uppercase text-emerald-500"
                  >
                    <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                    {studioLiveLabel}
                  </Badge>
                </div>
              </CardHeader>

              <Separator className="bg-border/60" />

              <CardContent className="p-0 pt-10">
                <div className="relative">
                  <motion.div
                    className="absolute left-4 right-4 top-5 -z-0 h-0.5 origin-left bg-border sm:left-6 sm:right-6"
                    variants={lineVariants}
                  />

                  <div className="relative z-10 grid grid-cols-5 gap-2">
                    {pipelineSteps.map((step, index) => {
                      const isCompleted = index === 4;
                      return (
                        <motion.div
                          key={step.num}
                          custom={index}
                          variants={stepVariants}
                          className="flex flex-col items-center text-center"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex size-10 items-center justify-center rounded-xl border transition-colors duration-300 ${
                              isCompleted
                                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30"
                                : "border-border bg-background text-foreground hover:border-primary/50"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="size-5" />
                            ) : (
                              <span className="text-xs font-black">
                                {step.num}
                              </span>
                            )}
                          </motion.div>
                          <p className="mt-3 text-xs font-bold uppercase text-foreground">
                            {step.label}
                          </p>
                          <p className="hidden text-[10px] text-muted-foreground sm:block">
                            {step.sub}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="mt-10 bg-border/60" />

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold">{teamLabel}</span>
                  <span className="font-bold text-primary">
                    {productionLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
