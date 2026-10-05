"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { caseStudySchema, type CaseStudyInput } from "@/features/portfolio/schemas";
import { MetricsFields } from "./metrics-fields";

const emptyValues: CaseStudyInput = {
  brand: "",
  title: "",
  goal: "",
  summary: "",
  published: false,
  metrics: [{ platform: "instagram", views: 0, reach: 0, engagement: 0 }],
};

export function PortfolioForm({ defaultValues }: { defaultValues?: CaseStudyInput }) {
  const t = useTranslations("admin.portfolio.form");
  const tCommon = useTranslations("admin.common");
  const [saved, setSaved] = useState(false);

  const form = useForm<CaseStudyInput>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: defaultValues ?? emptyValues,
  });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = form;

  // Phase C: replace with the create-case-study / update-case-study Server Actions.
  const onSubmit = async (values: CaseStudyInput) => {
    console.log("case study (mock save)", values);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="brand">{t("brand")}</Label>
            <Input id="brand" {...register("brand")} aria-invalid={!!errors.brand} />
            {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">{t("title")}</Label>
            <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="goal">{t("goal")}</Label>
            <Textarea id="goal" rows={2} {...register("goal")} aria-invalid={!!errors.goal} />
            {errors.goal && <p className="text-xs text-destructive">{errors.goal.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="summary">{t("summary")}</Label>
            <Textarea id="summary" rows={4} {...register("summary")} />
          </div>
        </CardContent>
      </Card>

      <MetricsFields form={form} />

      <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-4">
        <div>
          <Label htmlFor="published">{t("published")}</Label>
          <p className="text-xs text-muted-foreground">{t("publishedHint")}</p>
        </div>
        <Switch id="published" checked={watch("published")} onCheckedChange={(value) => setValue("published", value)} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>{tCommon("save")}</Button>
        {saved && <span className="text-sm text-emerald-600">{t("saveNote")}</span>}
      </div>
    </form>
  );
}
