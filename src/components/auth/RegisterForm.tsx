"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Globe,
  LoaderCircle,
  Sparkles,
  User,
  AlertCircle,
  Mail,
  Lock,
  Phone,
  Building,
  AtSign,
  Video,
  Layers,
  BarChart,
  Target,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-10 text-center shadow-lg dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <CheckCircle2 className="mx-auto size-16 text-primary animate-bounce" />
        <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900 dark:text-zinc-100">
          {labels.successTitle}
        </h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
          {labels.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <div className="grid grid-cols-2 gap-3 p-1.5 border backdrop-blur-sm rounded-xl">
            <button
              type="button"
              onClick={() => setRole("brand")}
              className={`flex flex-col items-center sm:items-start text-start p-4 rounded-lg transition-all duration-200 border ${
                role === "brand"
                  ? "border-primary bg-primary/10 text-gray-900 dark:text-zinc-100 shadow-sm"
                  : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <BriefcaseBusiness
                  className={`size-4 ${
                    role === "brand"
                      ? "text-primary"
                      : "text-gray-400 dark:text-zinc-400"
                  }`}
                />
                <span className="font-black uppercase tracking-wider text-sm">
                  {labels.brand}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 hidden sm:block leading-relaxed">
                {labels.brandDescription}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole("blogger")}
              className={`flex flex-col items-center sm:items-start text-start p-4 rounded-lg transition-all duration-200 border ${
                role === "blogger"
                  ? "border-primary bg-primary/10 text-gray-900 dark:text-zinc-100 shadow-sm"
                  : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles
                  className={`size-4 ${
                    role === "blogger"
                      ? "text-primary"
                      : "text-gray-400 dark:text-zinc-400"
                  }`}
                />
                <span className="font-black uppercase tracking-wider text-sm">
                  {labels.blogger}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 hidden sm:block leading-relaxed">
                {labels.bloggerDescription}
              </p>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400 font-semibold">
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 1: Credentials */}
            <div>
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
                  Account Credentials
                </h3>
              </div>
              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="register-name">
                    {labels.name} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <User className="size-4 text-gray-400 dark:text-zinc-500" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="register-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-email">
                    {labels.email} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail className="size-4 text-gray-400 dark:text-zinc-500" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="register-email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-password">
                    {labels.password} *
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock className="size-4 text-gray-400 dark:text-zinc-500" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="register-password"
                      required
                      type="password"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                    />
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-phone">
                    {labels.phone}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Phone className="size-4 text-gray-400 dark:text-zinc-500" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="register-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </InputGroup>
                </Field>
              </div>
            </div>

            {/* Section 2: Role Profile Data */}
            <div className="mt-2">
              <div className="flex items-center gap-2 ">
                {role === "brand" ? (
                  <BriefcaseBusiness className="size-3.5 text-primary" />
                ) : (
                  <Sparkles className="size-3.5 text-primary" />
                )}
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
                  {role === "brand"
                    ? "Brand Profile Data"
                    : "Blogger / Creator Data"}
                </h3>
              </div>
              <Separator className="my-4" />
              {role === "brand" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="company">
                      {labels.company} *
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Building className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="company"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Apex Dynamics"
                      />
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="industry">
                      {labels.industry}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Layers className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="border-0 shadow-none focus:ring-0 rounded-none bg-transparent h-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tech & E-commerce">
                            Tech & E-commerce
                          </SelectItem>
                          <SelectItem value="Fashion & Luxury">
                            Fashion & Luxury
                          </SelectItem>
                          <SelectItem value="Food & Beverage">
                            Food & Beverage
                          </SelectItem>
                          <SelectItem value="Gaming & Media">
                            Gaming & Media
                          </SelectItem>
                          <SelectItem value="Health & Beauty">
                            Health & Beauty
                          </SelectItem>
                          <SelectItem value="Automotive & Mobility">
                            Automotive & Mobility
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="budget">{labels.budget}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <DollarSign className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger className="border-0 shadow-none focus:ring-0 rounded-none bg-transparent h-full">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$1,000 - $5,000">
                            $1,000 - $5,000
                          </SelectItem>
                          <SelectItem value="$5,000 - $15,000">
                            $5,000 - $15,000
                          </SelectItem>
                          <SelectItem value="$15,000 - $50,000">
                            $15,000 - $50,000
                          </SelectItem>
                          <SelectItem value="$50,000+">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="goal">{labels.goal}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Target className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger className="border-0 shadow-none focus:ring-0 rounded-none bg-transparent h-full">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Creator Partnerships + Video">
                            Creator Partnerships + Video
                          </SelectItem>
                          <SelectItem value="Commercial Studio Production">
                            Commercial Studio Production
                          </SelectItem>
                          <SelectItem value="Multi-Channel Social Takeover">
                            Multi-Channel Social Takeover
                          </SelectItem>
                          <SelectItem value="Product Launch Blitz">
                            Product Launch Blitz
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                  </Field>

                  <Field className="sm:col-span-2">
                    <FieldLabel htmlFor="website">{labels.website}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Globe className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://brand.com"
                      />
                    </InputGroup>
                  </Field>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="niche">{labels.niche}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Sparkles className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <Select value={niche} onValueChange={setNiche}>
                        <SelectTrigger className="border-0 shadow-none focus:ring-0 rounded-none bg-transparent h-full">
                          <SelectValue placeholder="Select niche" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tech & Gadgets">
                            Tech & Gadgets
                          </SelectItem>
                          <SelectItem value="Fashion & Streetwear">
                            Fashion & Streetwear
                          </SelectItem>
                          <SelectItem value="Lifestyle & Travel">
                            Lifestyle & Travel
                          </SelectItem>
                          <SelectItem value="Gaming & Streaming">
                            Gaming & Streaming
                          </SelectItem>
                          <SelectItem value="Food & Hospitality">
                            Food & Hospitality
                          </SelectItem>
                          <SelectItem value="Fitness & Wellness">
                            Fitness & Wellness
                          </SelectItem>
                          <SelectItem value="Business & Finance">
                            Business & Finance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="handles">
                      {labels.handles} *
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <AtSign className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="handles"
                        required
                        value={handles}
                        onChange={(e) => setHandles(e.target.value)}
                        placeholder="yourhandle on Instagram / TikTok"
                      />
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="portfolio">
                      {labels.portfolio}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Video className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="portfolio"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://youtube.com/@channel"
                      />
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="monthlyViews">
                      {labels.monthlyViews}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <BarChart className="size-4 text-gray-400 dark:text-zinc-500" />
                      </InputGroupAddon>
                      <Select
                        value={monthlyViews}
                        onValueChange={setMonthlyViews}
                      >
                        <SelectTrigger className="border-0 shadow-none focus:ring-0 rounded-none bg-transparent h-full">
                          <SelectValue placeholder="Select views range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10K - 50K Views">
                            10K - 50K Views
                          </SelectItem>
                          <SelectItem value="50K - 200K Views">
                            50K - 200K Views
                          </SelectItem>
                          <SelectItem value="200K - 1M Views">
                            200K - 1M Views
                          </SelectItem>
                          <SelectItem value="1M+ Views">1M+ Views</SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                  </Field>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 font-bold uppercase tracking-wider text-xs h-12 w-full transition-all shadow-md"
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
            <Separator className="mt-4" />
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
              <span>{labels.haveAccount}</span>
              <Link
                href="/auth/login"
                className="font-bold text-primary hover:underline uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                {labels.login} →
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
