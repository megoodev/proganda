"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LoaderCircle, Lock, Mail, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 border border-white/10 bg-[#121212]/90 backdrop-blur-md p-6 sm:p-9 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff007f]/5 rounded-full blur-3xl pointer-events-none" />

      {error && (
        <div className="flex items-center gap-3 p-3.5 border border-[#ff007f]/50 bg-[#ff007f]/10 text-xs text-[#ff007f] font-semibold">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-1.5">
          <Mail className="size-3 text-[#ccff00]" />
          {labels.email}
        </label>
        <Input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@proganda.studio"
          className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-1.5">
          <Lock className="size-3 text-[#ccff00]" />
          {labels.password}
        </label>
        <Input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="mt-3 bg-[#ccff00] text-black font-black uppercase tracking-wider text-xs h-12 hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)]"
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

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
        <span>{labels.dontHaveAccount}</span>
        <Link
          href="/auth/register"
          className="font-bold text-[#ccff00] hover:underline uppercase tracking-wider flex items-center gap-1"
        >
          {labels.signUp}
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </form>
  );
}
