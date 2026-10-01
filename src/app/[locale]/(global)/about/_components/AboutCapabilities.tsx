"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { AboutCapability } from "./about-types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function AboutCapabilities({
  title,
  description,
  capabilities,
}: {
  title: string;
  description: string;
  capabilities: AboutCapability[];
}) {
  return (
    <section className="relative rounded-3xl bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <motion.div variants={itemVariants}>
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-primary">
            {title}
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
            {description}
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
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${bgAccent} ${accent} transition-transform duration-300 group-hover:scale-110`}
                  >
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
  );
}
