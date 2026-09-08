"use client";

import { useActionState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { submitContactAction, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    company: string;
    interest: string;
    interestPlaceholder: string;
    options: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    submitContactAction,
    { status: "idle" },
  );

  return (
    <form
      action={formAction}
      className="grid gap-5 border border-white/10 bg-[#171717] p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {labels.name}
          <Input name="name" required />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {labels.email}
          <Input name="email" required type="email" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {labels.company}
          <Input name="company" required />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {labels.interest}
          <select
            name="interest"
            required
            defaultValue=""
            className="field text-white"
          >
            <option value="" disabled>
              {labels.interestPlaceholder}
            </option>
            {labels.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
        {labels.message}
        <Textarea
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder={labels.messagePlaceholder}
        />
      </label>
      {state.status === "success" && (
        <p className="flex items-center gap-2 text-sm font-bold text-[#ccff00]">
          <CheckCircle2 className="size-4" />
          {labels.success}
        </p>
      )}
      {state.status === "error" && (
        <p className="text-sm font-bold text-[#ff007f]">{labels.error}</p>
      )}
      <Button
        type="submit"
        disabled={isPending}
        size="lg"
        className="bg-[#ccff00] text-black hover:bg-white"
      >
        {isPending ? labels.sending : labels.submit}
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <ArrowUpRight className="size-4" />
        )}
      </Button>
    </form>
  );
}
