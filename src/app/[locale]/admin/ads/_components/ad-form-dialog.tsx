"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field } from "@/components/shared/field";
import { FormDialog } from "@/components/shared/form-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { adPlacements, adSchema, adSources, type Ad, type AdInput } from "@/features/ads/schemas";

type Props = { ad?: Ad; onClose: () => void; onSave: (ad: Ad) => void };

const today = () => new Date().toISOString().slice(0, 10);

export function AdFormDialog({ ad, onClose, onSave }: Props) {
  const t = useTranslations("admin.ads");
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<AdInput>({
    resolver: zodResolver(adSchema),
    defaultValues: ad ?? { title: "", body: "", placement: "home", source: "company", brandName: "", startsAt: today(), endsAt: today(), published: true },
  });

  return (
    <FormDialog
      title={ad ? t("form.editTitle") : t("form.newTitle")}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSave({ ...values, id: ad?.id ?? crypto.randomUUID() }))}
    >
      <Field label={t("form.title")} htmlFor="title" error={errors.title?.message}>
        <Input id="title" {...register("title")} />
      </Field>
      <Field label={t("form.body")} htmlFor="body" error={errors.body?.message}>
        <Textarea id="body" rows={3} {...register("body")} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("form.placement")}>
          <Controller control={control} name="placement" render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{adPlacements.map((item) => <SelectItem key={item} value={item}>{t(`placements.${item}`)}</SelectItem>)}</SelectContent>
            </Select>
          )} />
        </Field>
        <Field label={t("form.source")}>
          <Controller control={control} name="source" render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{adSources.map((item) => <SelectItem key={item} value={item}>{t(`sources.${item}`)}</SelectItem>)}</SelectContent>
            </Select>
          )} />
        </Field>
      </div>

      {watch("source") === "brand" && (
        <Field label={t("form.brandName")} htmlFor="brandName" error={errors.brandName?.message}>
          <Input id="brandName" {...register("brandName")} />
        </Field>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("form.startsAt")} htmlFor="startsAt" error={errors.startsAt?.message}>
          <Input id="startsAt" type="date" {...register("startsAt")} />
        </Field>
        <Field label={t("form.endsAt")} htmlFor="endsAt" error={errors.endsAt?.message}>
          <Input id="endsAt" type="date" {...register("endsAt")} />
        </Field>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t("form.published")}</span>
        <Switch checked={watch("published")} onCheckedChange={(value) => setValue("published", value)} />
      </div>
    </FormDialog>
  );
}
