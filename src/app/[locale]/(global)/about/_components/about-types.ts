import {
  Camera,
  Clapperboard,
  Lightbulb,
  Scissors,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface AboutCopy {
  eyebrow: string;
  title: string;
  description: string;
  capabilityMeta: string;
  trackingLive: string;
  creatorManaged: string;
  averageRoi: string;
  growth: string;
  activeReach: string;
  viewsCount: string;
  contentEngine: string;
  metrics: string;
  studio: string;
  studioDescription: string;
  timeline: string;
  timelineLive: string;
  timelineDescription: string;
  inHousePipeline: string;
}

export interface AboutMetric {
  value: string;
  label: string;
}

export interface AboutCapability {
  icon: LucideIcon;
  label: string;
  accent: string;
  bgAccent: string;
}

const capabilityStyles = [
  { icon: Lightbulb, accent: "text-sky-500", bgAccent: "bg-sky-500/10" },
  { icon: Users, accent: "text-indigo-500", bgAccent: "bg-indigo-500/10" },
  { icon: Sparkles, accent: "text-purple-500", bgAccent: "bg-purple-500/10" },
  { icon: Camera, accent: "text-cyan-500", bgAccent: "bg-cyan-500/10" },
  { icon: Scissors, accent: "text-amber-500", bgAccent: "bg-amber-500/10" },
  {
    icon: Clapperboard,
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500/10",
  },
];

export function createAboutCapabilities(labels: string[]): AboutCapability[] {
  return labels.map((label, index) => ({
    ...capabilityStyles[index % capabilityStyles.length],
    label,
  }));
}
