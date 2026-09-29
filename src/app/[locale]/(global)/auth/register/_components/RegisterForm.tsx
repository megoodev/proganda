"use client";

import { useActionState, useState } from "react";
import { Link } from "@/i18n/navigation";
import { signUpAction, type AuthActionState } from "@/app/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
  User,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";
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
  };
}) {
  const initialAuthState: AuthActionState = {};
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialAuthState
  );
  const [role, setRole] = useState<"brand" | "blogger">(initialRole);
  const [applyForContract, setApplyForContract] = useState(false);

  // Clean form fields without dummy/placeholder values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Brand-specific fields
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [website, setWebsite] = useState("");

  // Blogger-specific fields
  const [niche, setNiche] = useState("");
  const [handles, setHandles] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [followers, setFollowers] = useState("");
  const [monthlyViews, setMonthlyViews] = useState("");

  if (state.success) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-10 text-center shadow-lg dark:shadow-2xl relative overflow-hidden transition-colors">
        <CheckCircle2 className="mx-auto size-16 text-primary animate-bounce" />
        <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900 dark:text-zinc-100">
          {labels.successTitle || "Account Created Successfully!"}
        </h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
          {applyForContract
            ? "Your application has been received and is under review."
            : labels.successMessage || "Welcome! Your account is ready."}
        </p>
        <Button asChild className="mt-6">
          <Link href="/auth/login">
            {labels.login}
            <ArrowRight className="size-4 ms-2" />
          </Link>
        </Button>
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
                    role === "brand" ? "text-primary" : "text-gray-400"
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
                    role === "blogger" ? "text-primary" : "text-gray-400"
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
          <form action={formAction} className="grid gap-6">
            <Input type="hidden" name="role" value={role} />

            {state.error && (
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400 font-semibold">
                <AlertCircle className="size-4 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            {/* Account Info Section */}
            <div>
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
                  Account Details
                </h3>
              </div>
              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="register-name">
                    {labels.name} *
                  </FieldLabel>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-email">
                    {labels.email} *
                  </FieldLabel>
                  <Input
                    id="register-email"
                    name="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-password">
                    {labels.password} *
                  </FieldLabel>
                  <Input
                    id="register-password"
                    name="password"
                    required
                    type="password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-phone">
                    {labels.phone}
                  </FieldLabel>
                  <Input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Field>
              </div>
            </div>

            {/* Contract Toggle Checkbox */}
            <div className="flex items-center gap-3 p-3.5 rounded-lg border border-primary bg-primary/10 ">
              <input
                type="checkbox"
                id="applyContract"
                checked={applyForContract}
                onChange={(e) => setApplyForContract(e.target.checked)}
                className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <label
                htmlFor="applyContract"
                className="text-xs font-semibold text-gray-400  cursor-pointer select-none"
              >
                I want to apply for an official partnership contract right now
              </label>
            </div>

            {/* Contract Application Fields */}
            {applyForContract && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                  <FileText className="size-3.5 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
                    {role === "brand"
                      ? "Brand Partnership Application"
                      : "Creator Contract Application"}
                  </h3>
                </div>
                <Separator className="my-4" />

                {role === "brand" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="company">
                        {labels.company} *
                      </FieldLabel>
                      <Input
                        id="company"
                        name="company"
                        required={applyForContract}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="website">{labels.website}</FieldLabel>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="industry">
                        {labels.industry}
                      </FieldLabel>
                      <Input type="hidden" name="industry" value={industry} />
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="w-full">
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
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="goal">{labels.goal}</FieldLabel>
                      <Input type="hidden" name="goal" value={goal} />
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Creator Partnerships">
                            Creator Partnerships
                          </SelectItem>
                          <SelectItem value="Commercial Production">
                            Commercial Production
                          </SelectItem>
                          <SelectItem value="Social Media Takeover">
                            Social Media Takeover
                          </SelectItem>
                          <SelectItem value="Product Launch Blitz">
                            Product Launch Blitz
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="handles">
                        {labels.handles} *
                      </FieldLabel>
                      <Input
                        id="handles"
                        name="handles"
                        required={applyForContract}
                        value={handles}
                        onChange={(e) => setHandles(e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="niche">{labels.niche}</FieldLabel>
                      <Input type="hidden" name="niche" value={niche} />
                      <Select value={niche} onValueChange={setNiche}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select niche" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Content</SelectItem>
                          <SelectItem value="Tech & Gadgets">
                            Tech & Gadgets
                          </SelectItem>
                          <SelectItem value="Fashion & Streetwear">
                            Fashion & Streetwear
                          </SelectItem>
                          <SelectItem value="Lifestyle & Vlogs">
                            Lifestyle & Vlogs
                          </SelectItem>
                          <SelectItem value="Gaming & Streaming">
                            Gaming & Streaming
                          </SelectItem>
                          <SelectItem value="Fitness & Health">
                            Fitness & Health
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="portfolio">
                        {labels.portfolio}
                      </FieldLabel>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="followers">
                        Followers Range
                      </FieldLabel>
                      <Input
                        type="hidden"
                        name="followers"
                        value={followers}
                      />
                      <Select value={followers} onValueChange={setFollowers}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select followers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1K - 10K">1K - 10K</SelectItem>
                          <SelectItem value="10K - 50K">10K - 50K</SelectItem>
                          <SelectItem value="50K - 200K">
                            50K - 200K
                          </SelectItem>
                          <SelectItem value="200K - 1M">200K - 1M</SelectItem>
                          <SelectItem value="1M+">1M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field className="sm:col-span-2">
                      <FieldLabel htmlFor="monthlyViews">
                        {labels.monthlyViews}
                      </FieldLabel>
                      <Input
                        type="hidden"
                        name="monthlyViews"
                        value={monthlyViews}
                      />
                      <Select
                        value={monthlyViews}
                        onValueChange={setMonthlyViews}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select views range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10K - 50K">
                            10K - 50K Views/Reach
                          </SelectItem>
                          <SelectItem value="50K - 500K">
                            50K - 500K Views/Reach
                          </SelectItem>
                          <SelectItem value="500K - 1M">
                            500K - 1M Views/Reach
                          </SelectItem>
                          <SelectItem value="1M+">1M+ Views/Reach</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="mt-4 font-bold uppercase tracking-wider text-xs h-12 w-full transition-all shadow-md"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  {labels.signingUp}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {applyForContract
                    ? "Submit Partnership Application"
                    : labels.submit}{" "}
                  ({role === "brand" ? labels.brand : labels.blogger})
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