"use client";

import { useActionState } from "react";
import { saveServiceAction, type CmsActionState } from "@/app/cms-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

type ServiceRecord = {
  id: string;
  name: string;
  eyebrow: string;
  scope: string;
  offer: string;
  features: string[];
  savingsRate: number;
  accent: string;
  published: boolean;
  sortOrder: number;
};

export function ServiceForm({ service }: { service?: ServiceRecord }) {
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(
    saveServiceAction,
    { status: "idle" },
  );

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="id">Plan id</FieldLabel>
          <Input id="id" name="id" required defaultValue={service?.id} />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" required defaultValue={service?.name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="eyebrow">Eyebrow</FieldLabel>
          <Input id="eyebrow" name="eyebrow" required defaultValue={service?.eyebrow} />
        </Field>
        <Field>
          <FieldLabel htmlFor="accent">Accent</FieldLabel>
          <select
            id="accent"
            name="accent"
            defaultValue={service?.accent ?? "lime"}
            className="h-9 rounded-md border border-white/10 bg-transparent px-3 text-sm"
          >
            <option value="lime">lime</option>
            <option value="purple">purple</option>
          </select>
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="scope">Scope</FieldLabel>
          <Textarea id="scope" name="scope" rows={3} required defaultValue={service?.scope} />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="offer">Offer</FieldLabel>
          <Input id="offer" name="offer" required defaultValue={service?.offer} />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="features">Features (comma separated)</FieldLabel>
          <Input
            id="features"
            name="features"
            required
            defaultValue={service?.features.join(", ")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="savingsRate">Savings rate (0-1)</FieldLabel>
          <Input
            id="savingsRate"
            name="savingsRate"
            type="number"
            step="0.01"
            min={0}
            max={1}
            required
            defaultValue={service?.savingsRate ?? 0.1}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={service?.sortOrder ?? 0}
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={service?.published ?? true} />
        Published on the public site
      </label>
      {state.message ? (
        <p className={state.status === "success" ? "text-emerald-400" : "text-red-400"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save plan"}
      </Button>
    </form>
  );
}
