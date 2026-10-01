"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { AboutMetric } from "./about-types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function AboutMetrics({
  title,
  metrics,
}: {
  title: string;
  metrics: AboutMetric[];
}) {
  return (
    <motion.section
      variants={itemVariants}
      className="mx-auto max-w-7xl px-6 lg:px-8"
    >
      <p className="mb-6 text-xs font-black uppercase tracking-widest text-primary">
        {title}
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map(({ value, label }) => (
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
    </motion.section>
  );
}
