"use client";

import { useActionState, useState } from "react";
import { Link } from "@/i18n/navigation";
import { signInAction, type AuthActionState } from "@/app/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  ArrowRight,
  LoaderCircle,
  Lock,
  Mail,
  AlertCircle,
  UserCheck,
} from "lucide-react";

const initialAuthState: AuthActionState = {};

export function LoginForm({
  labels,
  locale,
  next,
}: {
  labels: {
    email: string;
    password: string;
    login: string;
    signingIn: string;
    dontHaveAccount: string;
    signUp: string;
    errorDefault: string;
    accountLogin: string;
    demoAdminAccess: string;
    fillDemoCredentials: string;
  };
  locale: string;
  next?: string;
}) {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialAuthState,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoEnabled = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const demoEmail = "admin@proganda.studio";
  const demoPassword = "demo12345";

  return (
    <div className="grid gap-8">
      <Card className="relative overflow-hidden border-border bg-card shadow-lg">
        {/* Ambient background blur accents */}
        <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 size-40 bg-destructive/10 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-6 sm:p-9">
          <form action={formAction} className="grid gap-6">
            <input type="hidden" name="locale" value={locale} />
            {next ? <input type="hidden" name="next" value={next} /> : null}

            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4 shrink-0" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {demoEnabled && (
              <div className="rounded-lg border border-dashed border-border bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="size-3.5 text-[#3AA7FD]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {labels.demoAdminAccess}
                  </p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {demoEmail} / {demoPassword}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    setEmail(demoEmail);
                    setPassword(demoPassword);
                  }}
                >
                  {labels.fillDemoCredentials}
                </Button>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="size-3.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {labels.accountLogin}
                </h3>
              </div>
              <Separator className="my-4" />

              <div className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="login-email">
                    {labels.email} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@proganda.studio"
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="login-password">
                    {labels.password} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </InputGroup>
                </Field>
              </div>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="mt-2 h-12 w-full font-bold uppercase tracking-wider text-xs shadow-md transition-all"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  {labels.signingIn}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {labels.login}
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>

            <div className="mt-2 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{labels.dontHaveAccount}</span>
              <Link
                href="/auth/register"
                className="font-bold text-primary hover:underline uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                {labels.signUp} →
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
