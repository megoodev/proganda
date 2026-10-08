"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Trash2, Loader2 } from "lucide-react";

import { Field } from "@/components/shared/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { type SiteSettings } from "@/features/settings/schemas";
import { SOCIAL_ICON_OPTIONS } from "@/lib/social-icons";

interface SocialLinkItemProps {
  index: number;
  isDeleting: boolean;
  isSubmitting: boolean;
  register: UseFormRegister<SiteSettings>;
  errors: FieldErrors<SiteSettings>;
  onDelete: (index: number) => void;
}

export function SocialLinkItem({
  index,
  isDeleting,
  isSubmitting,
  register,
  errors,
  onDelete,
}: SocialLinkItemProps) {
  const t = useTranslations("admin.settings");
  const fieldErrors = errors.socialLinks?.[index];

  return (
    <div className="flex items-end gap-2 rounded-xl border border-border/40 bg-muted/20 p-3">
      <input type="hidden" {...register(`socialLinks.${index}.id`)} />

      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field
          label={t("socialFields.platform")}
          error={fieldErrors?.platform?.message}
        >
          <Input
            {...register(`socialLinks.${index}.platform`)}
            placeholder="instagram"
            className="h-8 rounded-md bg-background text-xs"
          />
        </Field>

        <Field
          label={t("socialFields.title")}
          error={fieldErrors?.title?.message}
        >
          <Input
            {...register(`socialLinks.${index}.title`)}
            placeholder="Instagram"
            className="h-8 rounded-md bg-background text-xs"
          />
        </Field>

        <Field
          label={t("socialFields.icon")}
          error={fieldErrors?.icon?.message}
        >
          <select
            {...register(`socialLinks.${index}.icon`)}
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">{t("socialFields.iconAuto")}</option>
            {SOCIAL_ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("socialFields.url")} error={fieldErrors?.url?.message}>
          <Input
            dir="ltr"
            {...register(`socialLinks.${index}.url`)}
            placeholder="https://..."
            className="h-8 rounded-md bg-background text-xs"
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2 pb-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isDeleting || isSubmitting}
          onClick={() => onDelete(index)}
          className="h-8 w-8 rounded-md text-muted-foreground hover:text-destructive"
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}