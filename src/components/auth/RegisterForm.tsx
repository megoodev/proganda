"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Globe,
  LoaderCircle,
  Sparkles,
  User,
  AlertCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export function RegisterForm({
  initialRole = "brand",
  labels,
}: {
  initialRole?: "brand" | "blogger";
  labels: {
    eyebrow: string;
    brand: string;
    blogger: string;
    brandDescription: string;
    bloggerDescription: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    company: string;
    industry: string;
    budget: string;
    goal: string;
    website: string;
    handles: string;
    niche: string;
    portfolio: string;
    monthlyViews: string;
    submit: string;
    haveAccount: string;
    login: string;
    signingUp: string;
    successTitle: string;
    successMessage: string;
    errorDefault: string;
  };
}) {
  const router = useRouter();
  const [role, setRole] = useState<"brand" | "blogger">(initialRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Common credentials
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Brand-specific fields
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Tech & E-commerce");
  const [budget, setBudget] = useState("$5,000 - $15,000");
  const [goal, setGoal] = useState("Creator Partnerships + Video");
  const [website, setWebsite] = useState("");

  // Blogger-specific fields
  const [niche, setNiche] = useState("Tech & Lifestyle");
  const [handles, setHandles] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [monthlyViews, setMonthlyViews] = useState("50K - 200K");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      email,
      password,
      name,
      role,
      phone,
      ...(role === "brand"
        ? { company, industry, budget, goal, website }
        : { niche, handles, portfolio, monthlyViews }),
    };

    try {
      const res = await authClient.signUp.email(payload);

      if (res.error) {
        setError(res.error.message || labels.errorDefault);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : labels.errorDefault;
      setError(message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border border-[#3AA7FD]/60 bg-[#121212]/95 backdrop-blur-md p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3AA7FD]/15 rounded-full blur-3xl pointer-events-none" />
        <CheckCircle2 className="mx-auto size-16 text-[#3AA7FD] animate-bounce" />
        <h2 className="mt-6 text-3xl font-black tracking-tight text-white">
          {labels.successTitle}
        </h2>
        <p className="mt-3 text-sm text-white/70 max-w-md mx-auto">
          {labels.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {/* Role Selection Switcher */}
      <div className="grid grid-cols-2 gap-3 p-1.5 border border-white/10 bg-black/40 backdrop-blur-sm rounded-none">
        <button
          type="button"
          onClick={() => setRole("brand")}
          className={`flex flex-col items-center sm:items-start text-start p-4 transition-all duration-200 border ${
            role === "brand"
              ? "border-[#3AA7FD] bg-[#3AA7FD]/10 text-white shadow-[0_0_25px_rgba(204,255,0,0.15)]"
              : "border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <BriefcaseBusiness
              className={`size-4 ${
                role === "brand" ? "text-[#3AA7FD]" : "text-white/40"
              }`}
            />
            <span className="font-black uppercase tracking-wider text-sm">
              {labels.brand}
            </span>
          </div>
          <p className="text-[11px] text-white/50 hidden sm:block leading-relaxed">
            {labels.brandDescription}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setRole("blogger")}
          className={`flex flex-col items-center sm:items-start text-start p-4 transition-all duration-200 border ${
            role === "blogger"
              ? "border-[#1B449A] bg-[#1B449A]/10 text-white shadow-[0_0_25px_rgba(255,0,127,0.15)]"
              : "border-transparent text-white/50 hover:text-white hover:bg-white/2"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles
              className={`size-4 ${
                role === "blogger" ? "text-[#1B449A]" : "text-white/40"
              }`}
            />
            <span className="font-black uppercase tracking-wider text-sm">
              {labels.blogger}
            </span>
          </div>
          <p className="text-[11px] text-white/50 hidden sm:block leading-relaxed">
            {labels.bloggerDescription}
          </p>
        </button>
      </div>

      {/* Main Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 border border-white/10 bg-[#121212]/90 backdrop-blur-md p-6 sm:p-9 shadow-2xl relative"
      >
        {error && (
          <div className="flex items-center gap-3 p-3.5 border border-[#1B449A]/50 bg-[#1B449A]/10 text-xs text-[#1B449A] font-semibold">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Credentials */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
            <User className="size-3.5 text-[#3AA7FD]" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Account Credentials
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                {labels.name} *
              </label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                {labels.email} *
              </label>
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                {labels.password} *
              </label>
              <Input
                required
                type="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                {labels.phone}
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Role Profile Data */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
            {role === "brand" ? (
              <BriefcaseBusiness className="size-3.5 text-[#3AA7FD]" />
            ) : (
              <Sparkles className="size-3.5 text-[#1B449A]" />
            )}
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {role === "brand"
                ? "Brand Profile Data"
                : "Blogger / Creator Data"}
            </h3>
          </div>

          {role === "brand" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.company} *
                </label>
                <Input
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Apex Dynamics"
                  className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.industry}
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-black/50 border border-white/15 focus:border-[#3AA7FD] h-11 px-3 text-sm text-white outline-none"
                >
                  <option value="Tech & E-commerce">Tech & E-commerce</option>
                  <option value="Fashion & Luxury">Fashion & Luxury</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Gaming & Media">Gaming & Media</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Automotive & Mobility">
                    Automotive & Mobility
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.budget}
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-black/50 border border-white/15 focus:border-[#3AA7FD] h-11 px-3 text-sm text-white outline-none"
                >
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.goal}
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-black/50 border border-white/15 focus:border-[#3AA7FD] h-11 px-3 text-sm text-white outline-none"
                >
                  <option value="Creator Partnerships + Video">
                    Creator Partnerships + Video
                  </option>
                  <option value="Commercial Studio Production">
                    Commercial Studio Production
                  </option>
                  <option value="Multi-Channel Social Takeover">
                    Multi-Channel Social Takeover
                  </option>
                  <option value="Product Launch Blitz">
                    Product Launch Blitz
                  </option>
                </select>
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                  <Globe className="size-3 text-[#3AA7FD]" />
                  {labels.website}
                </label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://brand.com"
                  className="bg-black/50 border-white/15 focus:border-[#3AA7FD] h-11 text-sm text-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.niche}
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="bg-black/50 border border-white/15 focus:border-[#1B449A] h-11 px-3 text-sm text-white outline-none"
                >
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Fashion & Streetwear">
                    Fashion & Streetwear
                  </option>
                  <option value="Lifestyle & Travel">Lifestyle & Travel</option>
                  <option value="Gaming & Streaming">Gaming & Streaming</option>
                  <option value="Food & Hospitality">Food & Hospitality</option>
                  <option value="Fitness & Wellness">Fitness & Wellness</option>
                  <option value="Business & Finance">Business & Finance</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.handles} *
                </label>
                <Input
                  required
                  value={handles}
                  onChange={(e) => setHandles(e.target.value)}
                  placeholder="yourhandle on Instagram / TikTok"
                  className="bg-black/50 border-white/15 focus:border-[#1B449A] h-11 text-sm text-white"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.portfolio}
                </label>
                <Input
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://youtube.com/@channel"
                  className="bg-black/50 border-white/15 focus:border-[#1B449A] h-11 text-sm text-white"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {labels.monthlyViews}
                </label>
                <select
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(e.target.value)}
                  className="bg-black/50 border border-white/15 focus:border-[#1B449A] h-11 px-3 text-sm text-white outline-none"
                >
                  <option value="10K - 50K Views">10K - 50K Views</option>
                  <option value="50K - 200K Views">50K - 200K Views</option>
                  <option value="200K - 1M Views">200K - 1M Views</option>
                  <option value="1M+ Views">1M+ Views</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`mt-4 font-black uppercase tracking-wider text-xs h-12 transition-all ${
            role === "brand"
              ? "bg-[#3AA7FD] text-black hover:bg-white shadow-[0_0_20px_rgba(204,255,0,0.25)]"
              : "bg-[#1B449A] text-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,0,127,0.25)]"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" />
              {labels.signingUp}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {labels.submit} (
              {role === "brand" ? labels.brand : labels.blogger})
              <ArrowRight className="size-4" />
            </span>
          )}
        </Button>

        <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>{labels.haveAccount}</span>
          <Link
            href="/auth/login"
            className="font-bold text-[#3AA7FD] hover:underline uppercase tracking-wider"
          >
            {labels.login} →
          </Link>
        </div>
      </form>
    </div>
  );
}
