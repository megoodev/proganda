import { cn } from "@/lib/utils";

export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

const tones: Record<Tone, { badge: string; dot: string }> = {
  neutral: { badge: "border-border bg-muted/60 text-muted-foreground", dot: "bg-muted-foreground/60" },
  info: { badge: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
  success: { badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  warning: { badge: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  danger: { badge: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300", dot: "bg-red-500" },
};

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone].badge)}>
      <span className={cn("size-1.5 rounded-full", tones[tone].dot)} />
      {label}
    </span>
  );
}
