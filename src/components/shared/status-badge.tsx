import { Badge } from "@/components/ui/badge";

export type Tone = "default" | "success" | "warning" | "destructive" | "secondary";

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
}

export function StatusBadge({ label, tone = "default" }: StatusBadgeProps) {
  const variantMap: Record<Tone, "default" | "secondary" | "destructive" | "outline"> = {
    default: "secondary",
    success: "default",
    warning: "outline",
    destructive: "destructive",
    secondary: "secondary",
  };

  return <Badge variant={variantMap[tone] ?? "secondary"}>{label}</Badge>;
}