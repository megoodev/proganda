"use client";

import { useState, useEffect } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";

import {
  siteSettingsSchema,
  type SiteSettings,
} from "@/features/settings/schemas";
import { updateSiteSettings } from "@/features/settings/actions/update-site-settings";

import { SettingsHeader } from "./settings-header";
import { GeneralSettingsSection } from "./general-settings-section";
import { SocialLinksSection } from "./social-links-section";
import { FormActions } from "./form-actions";

export function SettingsForm({
  defaultValues,
}: {
  defaultValues?: SiteSettings | null;
}) {
  const t = useTranslations("admin.settings");

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatFormValues = (values?: SiteSettings | null): SiteSettings => ({
    siteName: values?.siteName ?? "",
    whatsapp: values?.whatsapp ?? "",
    email: values?.email ?? "",
    phone: values?.phone ?? undefined,
    address: values?.address ?? undefined,
    instagram: values?.instagram ?? "",
    tiktok: values?.tiktok ?? "",
    youtube: values?.youtube ?? "",
    facebook: values?.facebook ?? "",
    socialLinks: (values?.socialLinks ?? []).map((link, idx) => ({
      ...link,
      id: link.id,
      title: link.title ?? "",
      icon: link.icon ?? undefined,
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

  useEffect(() => {
    reset(formatFormValues(defaultValues));
  }, [defaultValues, reset]);

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
      const result = await updateSiteSettings(values);

      if (result.ok) {
        setSaved(true);
      } else {
        setError(result.message || "Failed to save settings");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    }
  };

  const onInvalid = (errors: FieldErrors<SiteSettings>) => {
    console.error("Validation Errors:", errors);
    setError("يرجى التأكد من صحة البيانات المدخلة");
  };

  const handleDeleteSocial = (index: number) => {
    remove(index);
  };

  const handleReset = () => {
    if (!confirm("هل أنت تأكد من إعادة ضبط البيانات للقيم الافتراضية؟")) return;
    reset(formatFormValues(defaultValues));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="max-w-7xl space-y-6"
    >
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <SettingsHeader
          onReset={handleReset}
          isPending={false}
          isSubmitting={isSubmitting}
        />

        <GeneralSettingsSection register={register} errors={errors} />

        <Separator className="my-2 bg-border/40" />

        <SocialLinksSection
          fields={fields}
          deletingId={null}
          isPending={false}
          isSubmitting={isSubmitting}
          register={register}
          errors={errors}
          getValues={() => ({} as any)}
          onAppend={append}
          onDeleteSocial={handleDeleteSocial}
        />

        <FormActions
          saved={saved}
          error={error}
          isSubmitting={isSubmitting}
          isPending={false}
        />
      </div>
    </form>
  );
}