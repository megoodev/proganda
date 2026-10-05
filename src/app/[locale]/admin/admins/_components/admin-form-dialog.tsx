"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field } from "@/components/shared/field";
import { FormDialog } from "@/components/shared/form-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminRoles } from "@/features/admin/roles";
import { adminFormSchema, type AdminFormInput, type AdminUser } from "@/features/admin/schemas";

type Props = { admin?: AdminUser; onClose: () => void; onSave: (admin: AdminUser) => void };

export function AdminFormDialog({ admin, onClose, onSave }: Props) {
  const t = useTranslations("admin.admins.form");
  const tRoles = useTranslations("admin.roles");
  const { register, control, handleSubmit, formState: { errors } } = useForm<AdminFormInput>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: admin ?? { name: "", email: "", role: "campaign_manager" },
  });

  // Phase C: invite by email (Resend) and create the account through Better Auth.
  return (
    <FormDialog
      title={admin ? t("editTitle") : t("newTitle")}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSave({ ...values, id: admin?.id ?? crypto.randomUUID(), active: admin?.active ?? true }))}
    >
      <Field label={t("name")} htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} />
      </Field>
      <Field label={t("email")} htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" dir="ltr" {...register("email")} />
      </Field>
      <Field label={t("role")}>
        <Controller control={control} name="role" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{adminRoles.map((role) => <SelectItem key={role} value={role}>{tRoles(role)}</SelectItem>)}</SelectContent>
          </Select>
        )} />
      </Field>
    </FormDialog>
  );
}
