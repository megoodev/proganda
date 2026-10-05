"use client";

import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { platforms, type CaseStudyInput } from "@/features/portfolio/schemas";

const numberFields = ["views", "reach", "engagement"] as const;

export function MetricsFields({ form }: { form: UseFormReturn<CaseStudyInput> }) {
  const t = useTranslations("admin.portfolio.form");
  const tPlatforms = useTranslations("admin.platforms");
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "metrics" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{t("metrics")}</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ platform: "instagram", views: 0, reach: 0, engagement: 0 })}
        >
          <Plus className="size-4" />
          {t("addPlatform")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid items-end gap-3 rounded-lg border border-border/60 p-3 sm:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
            <div className="space-y-2">
              <Label>{t("platform")}</Label>
              <Controller
                control={control}
                name={`metrics.${index}.platform`}
                render={({ field: select }) => (
                  <Select value={select.value} onValueChange={select.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform} value={platform}>{tPlatforms(platform)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {numberFields.map((name) => (
              <div key={name} className="space-y-2">
                <Label>{t(name)}</Label>
                <Input type="number" min={0} inputMode="numeric" {...register(`metrics.${index}.${name}`, { valueAsNumber: true })} />
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              aria-label={t("remove")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
