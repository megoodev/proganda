"use client";

import { useActionState } from "react";
import { saveCreatorAction, type CmsActionState } from "@/app/cms-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

type CreatorRecord = {
  id?: string;
  slug: string;
  name: string;
  handle: string;
  niche: string;
  platforms: string[];
  reach: string;
  engagement: string;
  location: string;
  image: string;
  accent: string;
  bio?: string;
  published: boolean;
  sortOrder: number;
};

export function CreatorForm({ creator }: { creator?: CreatorRecord }) {
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(
    saveCreatorAction,
    { status: "idle" },
  );

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      {creator?.id ? <input type="hidden" name="id" value={creator.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" required defaultValue={creator?.name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input id="slug" name="slug" required defaultValue={creator?.slug} />
        </Field>
        <Field>
          <FieldLabel htmlFor="handle">Handle</FieldLabel>
          <Input id="handle" name="handle" required defaultValue={creator?.handle} />
        </Field>
        <Field>
          <FieldLabel htmlFor="niche">Niche</FieldLabel>
          <Input id="niche" name="niche" required defaultValue={creator?.niche} />
        </Field>
        <Field>
          <FieldLabel htmlFor="platforms">Platforms (comma separated)</FieldLabel>
          <Input
            id="platforms"
            name="platforms"
            required
            defaultValue={creator?.platforms.join(", ")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input id="location" name="location" required defaultValue={creator?.location} />
        </Field>
        <Field>
          <FieldLabel htmlFor="reach">Reach</FieldLabel>
          <Input id="reach" name="reach" required defaultValue={creator?.reach} />
        </Field>
        <Field>
          <FieldLabel htmlFor="engagement">Engagement</FieldLabel>
          <Input
            id="engagement"
            name="engagement"
            required
            defaultValue={creator?.engagement}
          />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="image">Image URL</FieldLabel>
          <Input id="image" name="image" required defaultValue={creator?.image} />
        </Field>
        <Field>
          <FieldLabel htmlFor="accent">Accent color</FieldLabel>
          <Input id="accent" name="accent" required defaultValue={creator?.accent ?? "#3AA7FD"} />
        </Field>
        <Field>
          <FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={creator?.sortOrder ?? 0}
          />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea id="bio" name="bio" rows={4} defaultValue={creator?.bio} />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={creator?.published ?? true}
        />
        Published on the public site
      </label>
      {state.message ? (
        <p className={state.status === "success" ? "text-emerald-400" : "text-red-400"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save creator"}
      </Button>
    </form>
  );
}
