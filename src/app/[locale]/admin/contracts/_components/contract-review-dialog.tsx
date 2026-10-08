"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field } from "@/components/shared/field";
import { FormDialog } from "@/components/shared/form-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reviewContract } from "@/features/contracts/actions/review-contract";
import {
  contractReviewSchema,
  contractStatuses,
  type ContractRequest,
  type ContractReviewInput,
} from "@/features/contracts/schemas";

type Props = { contract: ContractRequest; onClose: () => void; onSave: (contract: ContractRequest) => void };

export function ContractReviewDialog({ contract, onClose, onSave }: Props) {
  const t = useTranslations("admin.contracts");
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ContractReviewInput>({
    resolver: zodResolver(contractReviewSchema),
    defaultValues: { status: contract.status, notes: contract.notes },
  });

  return (
    <FormDialog
      title={`${t("review")}: ${contract.party}`}
      onClose={onClose}
      submitting={isSubmitting}
      onSubmit={handleSubmit(async (values) => {
        const result = await reviewContract({ id: contract.id, ...values });
        if (result.ok) onSave(result.data);
      })}
    >
      <Field label={t("form.status")}>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contractStatuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {t(`statuses.${item}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>
      <Field label={t("form.notes")} htmlFor="notes" hint={t("form.notesHint")}>
        <Textarea id="notes" rows={4} {...register("notes")} />
      </Field>
    </FormDialog>
  );
}
