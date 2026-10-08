"use client";

import { useTranslations } from "next-intl";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  saved: boolean;
  error: string | null;
  isSubmitting: boolean;
  isPending: boolean;
}

export function FormActions({
  saved,
  error,
  isSubmitting,
  isPending,
}: FormActionsProps) {
  const t = useTranslations("admin.settings");
  const tCommon = useTranslations("admin.common");

  return (
    <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <p className="text-xs text-muted-foreground">{t("saveChangesHint")}</p>
      </div>

      <div className="flex items-center gap-3">
        {saved && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="size-4" />
            {t("saved")}
          </span>
        )}
        {error && (
          <span className="flex items-center gap-1 text-xs font-medium text-destructive">
            <AlertCircle className="size-4" />
            {error}
          </span>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          size="sm"
          className="h-9 rounded-lg px-6 font-medium"
        >
          {isSubmitting ? t("saving") : tCommon("save")}
        </Button>
      </div>
    </div>
  );
}