"use client";

import { useActionState } from "react";
import { saveBrandAction, type CmsActionState } from "@/app/cms-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

type BrandRecord = {
  id?: string;
  slug: string;
  name: string;
  industry: string;
  campaign: string;
  description: string;
  services: string[];
  views: string;
  roi: string;
  color: string;
  published: boolean;
  sortOrder: number;
};

export function BrandForm({ brand }: { brand?: BrandRecord }) {
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(
    saveBrandAction,
    { status: "idle" },
  );

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      {brand?.id ? <input type="hidden" name="id" value={brand.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" required defaultValue={brand?.name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input id="slug" name="slug" required defaultValue={brand?.slug} />
        </Field>
        <Field>
          <FieldLabel htmlFor="industry">Industry</FieldLabel>
          <Input id="industry" name="industry" required defaultValue={brand?.industry} />
        </Field>
        <Field>
          <FieldLabel htmlFor="campaign">Campaign</FieldLabel>
          <Input id="campaign" name="campaign" required defaultValue={brand?.campaign} />
        </Field>
        <Field>
          <FieldLabel htmlFor="views">Views</FieldLabel>
          <Input id="views" name="views" required defaultValue={brand?.views} />
        </Field>
        <Field>
          <FieldLabel htmlFor="roi">ROI</FieldLabel>
          <Input id="roi" name="roi" required defaultValue={brand?.roi} />
        </Field>
        <Field>
          <FieldLabel htmlFor="color">Color</FieldLabel>
          <Input id="color" name="color" required defaultValue={brand?.color ?? "#3AA7FD"} />
        </Field>
        <Field>
          <FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={brand?.sortOrder ?? 0}
          />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="services">Services (comma separated)</FieldLabel>
          <Input
            id="services"
            name="services"
            required
            defaultValue={brand?.services.join(", ")}
          />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={4}
            required
            defaultValue={brand?.description}
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={brand?.published ?? true} />
        Published on the public site
      </label>
      {state.message ? (
        <p className={state.status === "success" ? "text-emerald-400" : "text-red-400"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save brand"}
      </Button>
    </form>
  );
}
