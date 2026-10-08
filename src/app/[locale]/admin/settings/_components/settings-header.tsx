"use client";

import { useTranslations } from "next-intl";
import { Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  onReset: () => void;
  isPending: boolean;
  isSubmitting: boolean;
}

export function SettingsHeader({
  onReset,
  isPending,
  isSubmitting,
}: SettingsHeaderProps) {
  const t = useTranslations("admin.settings");

  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Settings className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
          <p className="text-xs text-muted-foreground">{t("description")}</p>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onReset}
        disabled={isPending || isSubmitting}
        className="h-8 gap-1.5 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <RotateCcw className="size-3.5" />
        إعادة ضبط
      </Button>
    </div>
  );
}