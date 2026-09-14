"use client";

import { useActionState, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  User,
  Mail,
  Building,
  Target,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { submitContactAction, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [selectedInterest, setSelectedInterest] = useState("");

  return (
    <div className="grid gap-8">
      <Card className="relative rounded-sm overflow-hidden border-border bg-card shadow-lg">
        {/* Ambient background blur accents */}
        <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-sm blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 size-40 bg-destructive/10 rounded-sm blur-3xl pointer-events-none" />

        <CardHeader className="p-6 sm:p-8 pb-0 sm:pb-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Send Us a Message
            </h3>
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form action={formAction} className="grid gap-6">
            {state.status === "success" && (
              <div className="flex items-center gap-3 p-3.5 rounded-sm border border-emerald-500/20 bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{labels.success}</span>
              </div>
            )}

            {state.status === "error" && (
              <div className="flex items-center gap-3 p-3.5 rounded-sm border border-destructive/20 bg-destructive/10 text-xs font-semibold text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                <span>{labels.error}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-name">
                  {labels.name} *
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon >
                    <User className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Alex Morgan"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-email">
                  {labels.email} *
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon >
                    <Mail className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-company">
                  {labels.company} *
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon >
                    <Building className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-company"
                    name="company"
                    required
                    placeholder="Apex Dynamics"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-interest">
                  {labels.interest} *
                </FieldLabel>
                {/* Hidden input ensures standard FormData capture in Server Actions */}
                <input
                  type="hidden"
                  name="interest"
                  value={selectedInterest}
                  required
                />
                <InputGroup>
                  <InputGroupAddon >
                    <Target className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <Select
                    value={selectedInterest}
                    onValueChange={setSelectedInterest}
                  >
                    <SelectTrigger id="contact-interest" className="border-0 shadow-none focus:ring-0 rounded-sm bg-transparent h-full">
                      <SelectValue placeholder={labels.interestPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {labels.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </InputGroup>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="contact-message">
                {labels.message} *
              </FieldLabel>
              <Textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder={labels.messagePlaceholder}
                className="bg-background border-input resize-none"
              />
            </Field>

            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 h-12 w-full font-bold uppercase tracking-wider text-xs shadow-md transition-all rounded-sm"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  {labels.sending}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {labels.submit}
                  <ArrowUpRight className="size-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}