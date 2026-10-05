"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Plus,
  Trash2,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Settings,
} from "lucide-react";
import { Field } from "@/components/shared/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  siteSettingsSchema,
  type SiteSettings,
} from "@/features/settings/schemas";
import { updateSettings } from "@/features/settings/actions/update-settings";
import { Separator } from "@/components/ui/separator";
import { SOCIAL_ICON_OPTIONS, normalizeIconKey } from "@/lib/social-icons";

export function SettingsForm({
  defaultValues,
}: {
  defaultValues?: SiteSettings | null;
}) {
  const t = useTranslations("admin.settings");
  const tCommon = useTranslations("admin.common");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to normalize values safely and handle null/undefined inputs
  const formatFormValues = (
    values?: SiteSettings | null
  ): SiteSettings => ({
    siteName: values?.siteName ?? "",
    whatsapp: values?.whatsapp ?? "",
    email: values?.email ?? "",
    socialLinks: (values?.socialLinks ?? []).map((link, idx) => ({
      ...link,
      title: link.title ?? "",
      icon: normalizeIconKey(link.icon),
      sortOrder: link.sortOrder ?? idx,
    })),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettings>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: formatFormValues(defaultValues),
  });

  // Keep form in sync if defaultValues prop changes asynchronously
  useEffect(() => {
    reset(formatFormValues(defaultValues));
  }, [defaultValues, reset]);

  // Handle timeout cleanup safely when `saved` state changes
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const onSubmit: SubmitHandler<SiteSettings> = async (values) => {
    try {
      setError(null);
      await updateSettings(values);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/40 pb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Settings className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
            <p className="text-xs text-muted-foreground">{t("description")}</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4 py-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Globe className="size-4 text-primary" />
            {t("sections.contact")}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              label={t("fields.siteName")}
              error={errors.siteName?.message}
            >
              <Input
                {...register("siteName")}
                placeholder="ProGanda"
                className="h-9 rounded-lg"
              />
            </Field>

            <Field
              label={t("fields.whatsapp")}
              error={errors.whatsapp?.message}
            >
              <div className="relative">
                <Phone className="absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  dir="ltr"
                  className="h-9 rounded-lg ps-8 text-xs"
                  {...register("whatsapp")}
                  placeholder="+201001234567"
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
                  placeholder="hello@proganda.studio"
                />
              </div>
            </Field>
          </div>
        </div>

        <Separator className="my-2 bg-border/40" />

        {/* Social Links */}
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
                append({
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
              <p className="text-xs text-muted-foreground">
                {t("noSocialLinks")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-end gap-2 rounded-xl border border-border/40 bg-muted/20 p-3"
                >
                  <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Field
                      label={t("socialFields.platform")}
                      error={errors.socialLinks?.[index]?.platform?.message}
                    >
                      <Input
                        {...register(`socialLinks.${index}.platform`)}
                        placeholder="instagram"
                        className="h-8 rounded-md bg-background text-xs"
                      />
                    </Field>

                    <Field
                      label={t("socialFields.title")}
                      error={errors.socialLinks?.[index]?.title?.message}
                    >
                      <Input
                        {...register(`socialLinks.${index}.title`)}
                        placeholder="Instagram"
                        className="h-8 rounded-md bg-background text-xs"
                      />
                    </Field>

                    <Field
                      label={t("socialFields.icon")}
                      error={errors.socialLinks?.[index]?.icon?.message}
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

                    <Field
                      label={t("socialFields.url")}
                      error={errors.socialLinks?.[index]?.url?.message}
                    >
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
                      onClick={() => remove(index)}
                      className="h-8 w-8 rounded-md text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-xs text-muted-foreground">
              {t("saveChangesHint")}
            </p>
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
              disabled={isSubmitting}
              size="sm"
              className="h-9 rounded-lg px-6 font-medium"
            >
              {isSubmitting ? t("saving") : tCommon("save")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}