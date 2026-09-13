"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
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

export function LoginForm({
  labels,
}: {
  labels: {
    email: string;
    password: string;
    login: string;
    signingIn: string;
    dontHaveAccount: string;
    signUp: string;
    errorDefault: string;
  };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || labels.errorDefault);
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : labels.errorDefault;
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <Card className="relative overflow-hidden border-border bg-card shadow-lg">
        {/* Ambient background blur accents */}
        <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 size-40 bg-destructive/10 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-6 sm:p-9">
          <form onSubmit={handleSubmit} className="grid gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4 shrink-0" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="size-3.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Account Login
                </h3>
              </div>
              <Separator className="my-4" />

              <div className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="login-email">
                    {labels.email} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon placement="start">
                      <Mail className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-email"
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
                    <InputGroupAddon placement="start">
                      <Lock className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-password"
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
              disabled={loading}
              className="mt-2 h-12 w-full font-bold uppercase tracking-wider text-xs shadow-md transition-all"
            >
              {loading ? (
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