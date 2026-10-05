"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field } from "@/components/shared/field";
import { FormDialog } from "@/components/shared/form-dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema, type Service, type ServiceInput } from "@/features/services/schemas";

type Props = { service?: Service; onClose: () => void; onSave: (service: Service) => void };

export function ServiceFormDialog({ service, onClose, onSave }: Props) {
  const t = useTranslations("admin.services.form");
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service ?? { title: "", description: "", published: true },
  });

  return (
    <FormDialog
      title={service ? t("editTitle") : t("newTitle")}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSave({ ...values, id: service?.id ?? crypto.randomUUID() }))}
    >
      <Field label={t("title")} htmlFor="title" error={errors.title?.message}>
        <Input id="title" {...register("title")} />
      </Field>
      <Field label={t("description")} htmlFor="description" error={errors.description?.message}>
        <Textarea id="description" rows={4} {...register("description")} />
      </Field>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t("published")}</span>
        <Switch checked={watch("published")} onCheckedChange={(value) => setValue("published", value)} />
      </div>
    </FormDialog>
  );
}
