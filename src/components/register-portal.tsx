"use client";

import { useState, useTransition } from "react";
import { ArrowRight, BriefcaseBusiness, Check, UserRound } from "lucide-react";
import { registerUserAction, type RegistrationState } from "@/app/actions";

export function RegisterPortal({
  labels,
  initialRole,
}: {
  labels: Record<string, string>;
  initialRole?: "brand" | "creator";
}) {
  const [role, setRole] = useState<"brand" | "creator" | null>(
    initialRole ?? null,
  );
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<RegistrationState>({ status: "idle" });
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    company: "",
    industry: "",
    budget: "",
    goal: "",
    handles: "",
    niche: "",
    portfolio: "",
    monthlyViews: "",
  });
  const change = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!role) return;
    startTransition(async () =>
      setState(await registerUserAction(state, { ...form, role })),
    );
  };
  if (!role)
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setRole("brand")}
          className="group border border-[#ccff00]/40 bg-[#ccff00]/[.06] p-7 text-start transition hover:-translate-y-1 hover:bg-[#ccff00]/[.12]"
        >
          <BriefcaseBusiness className="size-7 text-[#ccff00]" />
          <h2 className="mt-16 text-2xl font-black">{labels.brandRole}</h2>
          <ArrowRight className="mt-8 size-5 text-[#ccff00] transition group-hover:translate-x-2" />
        </button>
        <button
          onClick={() => setRole("creator")}
          className="group border border-[#8a2be2]/50 bg-[#8a2be2]/[.08] p-7 text-start transition hover:-translate-y-1 hover:bg-[#8a2be2]/[.14]"
        >
          <UserRound className="size-7 text-[#ff007f]" />
          <h2 className="mt-16 text-2xl font-black">{labels.creatorRole}</h2>
          <ArrowRight className="mt-8 size-5 text-[#ff007f] transition group-hover:translate-x-2" />
        </button>
      </div>
    );
  if (state.status === "success")
    return (
      <div className="border border-[#ccff00]/50 p-10 text-center">
        <Check className="mx-auto size-10 text-[#ccff00]" />
        <h2 className="mt-5 text-3xl font-black">{state.message}</h2>
      </div>
    );
  const fields =
    role === "brand"
      ? [
          ["company", labels.company],
          ["industry", labels.industry],
          ["budget", labels.budget],
          ["goal", labels.goal],
        ]
      : [
          ["handles", labels.handles],
          ["niche", labels.niche],
          ["portfolio", labels.portfolio],
          ["monthlyViews", labels.monthlyViews],
        ];
  return (
    <form
      onSubmit={submit}
      className="border border-white/10 bg-white/[.03] p-6 sm:p-9"
    >
      <button
        type="button"
        onClick={() => setRole(null)}
        className="mb-8 text-xs font-bold uppercase tracking-widest text-white/45 hover:text-white"
      >
        ← change role
      </button>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs uppercase tracking-widest text-white/50">
          name
          <input
            required
            value={form.name}
            onChange={(event) => change("name", event.target.value)}
            className="field"
          />
        </label>
        <label className="grid gap-2 text-xs uppercase tracking-widest text-white/50">
          email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => change("email", event.target.value)}
            className="field"
          />
        </label>
        {fields.map(([key, label]) => (
          <label
            key={key}
            className="grid gap-2 text-xs uppercase tracking-widest text-white/50"
          >
            {label}
            <input
              required
              value={form[key]}
              onChange={(event) => change(key, event.target.value)}
              className="field"
            />
          </label>
        ))}
      </div>
      {state.message && (
        <p className="mt-5 text-sm text-[#ff007f]">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-5 py-3 text-sm font-bold text-black hover:bg-white"
      >
        {pending ? "..." : labels.submit}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
