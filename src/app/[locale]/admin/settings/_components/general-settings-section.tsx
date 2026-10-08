"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Globe, Mail, Phone } from "lucide-react";

import { Field } from "@/components/shared/field";
import { Input } from "@/components/ui/input";
import { type SiteSettings } from "@/features/settings/schemas";

interface GeneralSettingsSectionProps {
  register: UseFormRegister<SiteSettings>;
  errors: FieldErrors<SiteSettings>;
}

export function GeneralSettingsSection({
  register,
  errors,
}: GeneralSettingsSectionProps) {
  const t = useTranslations("admin.settings");

  return (
    <div className="space-y-4 py-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Globe className="size-4 text-primary" />
        {t("sections.contact")}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={t("fields.siteName")} error={errors.siteName?.message}>
          <Input
            {...register("siteName")}
            placeholder="ProGanda"
            className="h-9 rounded-lg"
          />
        </Field>

        <Field label={t("fields.whatsapp")} error={errors.whatsapp?.message}>
          <div className="relative">
            <Phone className="absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              dir="ltr"
              className="h-9 rounded-lg ps-8 text-xs"
              {...register("whatsapp")}
              placeholder="+20000000000"
            />
          </div>
        </Field>

        <Field label={t("fields.email")} error={errors.email?.message}>
          <div className="relative">
            <Mail className="absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              dir="ltr"
              className="h-9 rounded-lg ps-8 text-xs"
              {...register("email")}
              placeholder="demo@email.co"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}