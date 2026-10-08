"use client";

import {
  UseFormRegister,
  FieldErrors,
  FieldArrayWithId,
  UseFormGetValues,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { ExternalLink, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinkItem } from "./social-link-item";
import { type SiteSettings } from "@/features/settings/schemas";

interface SocialLinksSectionProps {
  fields: FieldArrayWithId<SiteSettings, "socialLinks", "id">[];
  deletingId: string | null;
  isPending: boolean;
  isSubmitting: boolean;
  register: UseFormRegister<SiteSettings>;
  errors: FieldErrors<SiteSettings>;
  getValues: UseFormGetValues<SiteSettings>;
  onAppend: (item: any) => void;
  onDeleteSocial: (index: number) => void;
}

export function SocialLinksSection({
  fields,
  deletingId,
  isPending,
  isSubmitting,
  register,
  errors,
  getValues,
  onAppend,
  onDeleteSocial,
}: SocialLinksSectionProps) {
  const t = useTranslations("admin.settings");

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ExternalLink className="size-4 text-primary" />
          {t("sections.social")}
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onAppend({
              platform: "",
              title: "",
              url: "",
              icon: "",
              sortOrder: fields.length,
            })
          }
          className="h-8 gap-1 rounded-lg text-xs font-medium"
        >
          <Plus className="size-3.5" />
          {t("addSocial")}
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-center">
          <p className="text-xs text-muted-foreground">{t("noSocialLinks")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => {
            const currentDbId = getValues(`socialLinks.${index}`)?.id;
            const isDeleting = Boolean(
              currentDbId && deletingId === currentDbId && isPending,
            );

            return (
              <SocialLinkItem
                key={field.id}
                index={index}
                isDeleting={isDeleting}
                isSubmitting={isSubmitting}
                register={register}
                errors={errors}
                onDelete={onDeleteSocial}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}