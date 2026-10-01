"use client";

import { motion, type Variants } from "framer-motion";
import { AboutCapabilities } from "./AboutCapabilities";
import { AboutHero } from "./AboutHero";
import { AboutMetrics } from "./AboutMetrics";
import { AboutWorkflow } from "./AboutWorkflow";
import {
  createAboutCapabilities,
  type AboutCopy,
  type AboutMetric,
} from "./about-types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AboutClientContent({
  copy,
  metricsData,
  capabilityLabels,
  timelineItems,
}: {
  copy: AboutCopy;
  metricsData: AboutMetric[];
  capabilityLabels: string[];
  timelineItems: string[];
}) {
  const capabilities = createAboutCapabilities(capabilityLabels);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-20 lg:space-y-28"
    >
      <AboutHero copy={copy} capabilities={capabilities} />
      <AboutMetrics title={copy.metrics} metrics={metricsData} />
      <AboutCapabilities
        title={copy.studio}
        description={copy.studioDescription}
        capabilities={capabilities}
      />
      <AboutWorkflow
        title={copy.timeline}
        liveLabel={copy.timelineLive}
        description={copy.timelineDescription}
        pipelineLabel={copy.inHousePipeline}
        timelineItems={timelineItems}
      />
    </motion.div>
  );
}
