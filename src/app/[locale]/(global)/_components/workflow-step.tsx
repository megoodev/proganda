"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

export interface PipelineStep {
  num: string;
  label: string;
  sub: string;
}

const stepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.7 + i * 0.12, duration: 0.5, type: "spring", stiffness: 260, damping: 20 },
  }),
};

type Props = { step: PipelineStep; index: number; isCompleted: boolean };

export function WorkflowStep({ step, index, isCompleted }: Props) {
  return (
    <motion.div
      custom={index}
      variants={stepVariants}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`flex size-10 items-center justify-center rounded-xl border transition-colors duration-300 ${
          isCompleted
            ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30"
            : "border-border bg-background text-foreground hover:border-primary/50"
        }`}
      >
        {isCompleted ? <Check className="size-5" /> : <span className="text-xs font-black">{step.num}</span>}
      </div>
      <p className="mt-3 text-xs font-bold uppercase text-foreground">{step.label}</p>
      <p className="hidden text-[10px] text-muted-foreground sm:block">{step.sub}</p>
    </motion.div>
  );
}
