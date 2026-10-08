"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field } from "@/components/shared/field";
import { FormDialog } from "@/components/shared/form-dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createShowcaseCreator } from "@/features/creators/actions/create-showcase-creator";
import { updateShowcaseCreator } from "@/features/creators/actions/update-showcase-creator";
import { showcaseCreatorSchema, type ShowcaseCreator, type ShowcaseCreatorInput } from "@/features/creators/schemas";

type Props = { creator?: ShowcaseCreator; onClose: () => void; onSave: (creator: ShowcaseCreator) => void };

export function CreatorFormDialog({ creator, onClose, onSave }: Props) {
  const t = useTranslations("admin.creators.form");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ShowcaseCreatorInput>({
    resolver: zodResolver(showcaseCreatorSchema),
    defaultValues: creator ?? { name: "", niche: "", reach: "", image: "", published: true },
  });

  return (
    <FormDialog
      title={creator ? t("editTitle") : t("newTitle")}
      onClose={onClose}
      submitting={isSubmitting}
      onSubmit={handleSubmit(async (values) => {
        const result = creator
          ? await updateShowcaseCreator({ id: creator.id, ...values })
          : await createShowcaseCreator(values);
        if (result.ok) onSave(result.data);
      })}
    >
      <Field label={t("name")} htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("niche")} htmlFor="niche" error={errors.niche?.message}>
          <Input id="niche" {...register("niche")} />
        </Field>
        <Field label={t("reach")} htmlFor="reach" hint={t("reachHint")} error={errors.reach?.message}>
          <Input id="reach" dir="ltr" {...register("reach")} />
        </Field>
      </div>
      <Field label={t("image")} htmlFor="image" hint={t("imageHint")} error={errors.image?.message}>
        <Input id="image" dir="ltr" {...register("image")} />
      </Field>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t("published")}</span>
        <Switch checked={watch("published")} onCheckedChange={(value) => setValue("published", value)} />
      </div>
    </FormDialog>
  );
}
