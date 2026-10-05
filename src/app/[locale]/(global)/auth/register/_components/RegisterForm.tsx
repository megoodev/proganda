"use client";

import {
  useActionState,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Sparkles,
  User,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { signUpAction, type AuthActionState } from "@/app/auth-actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "user" | "brand" | "blogger";

export type RegisterLabels = {
  brand: string;
  blogger: string;
  user: string;
  brandDescription: string;
  bloggerDescription: string;
  userDescription: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  governorate: string;
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
  connectWith: string;
  accountDetails: string;
  contractPrompt: string;
  brandApplication: string;
  creatorApplication: string;
  selectIndustry: string;
  industries: Record<string, string>;
  selectGoal: string;
  goals: Record<string, string>;
  selectNiche: string;
  allContent: string;
  niches: Record<string, string>;
  followersRange: string;
  selectFollowers: string;
  selectViewsRange: string;
  viewsReach: string;
  submitApplication: string;
  applicationReceived: string;
};

// [stored value, label key]
const INDUSTRIES = [
  ["Tech & E-commerce", "tech"],
  ["Fashion & Luxury", "fashion"],
  ["Food & Beverage", "food"],
  ["Gaming & Media", "gaming"],
  ["Health & Beauty", "health"],
  ["Other", "other"],
] as const;

const GOALS = [
  ["Creator Partnerships", "creatorPartnerships"],
  ["Commercial Production", "commercialProduction"],
  ["Social Media Takeover", "socialMedia"],
  ["Product Launch Blitz", "productLaunch"],
] as const;

const NICHES = [
  ["Tech & Gadgets", "tech"],
  ["Fashion & Streetwear", "fashion"],
  ["Lifestyle & Vlogs", "lifestyle"],
  ["Gaming & Streaming", "gaming"],
  ["Fitness & Health", "fitness"],
] as const;

const FOLLOWERS = ["1K - 10K", "10K - 50K", "50K - 200K", "200K - 1M", "1M+"];
const VIEWS = ["10K - 50K", "50K - 500K", "500K - 1M", "1M+"];

const EMPTY = {
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  governorate: "",
  company: "",
  website: "",
  industry: "",
  goal: "",
  handles: "",
  niche: "",
  portfolio: "",
  followers: "",
  monthlyViews: "",
};
type FieldName = keyof typeof EMPTY;

const tabClass = (active: boolean) =>
  cn(
    "flex flex-col items-center sm:items-start text-start p-4 rounded-lg transition-all duration-200 border",
    active
      ? "border-primary bg-primary/10 text-gray-900 dark:text-zinc-100 shadow-sm"
      : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800/50",
  );

function SectionTitle({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
          {children}
        </h3>
      </div>
      <Separator className="my-4" />
    </>
  );
}

function TextField({
  label,
  id,
  className,
  ...props
}: ComponentProps<"input"> & { label: string }) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>
        {label}
        {props.required ? " *" : ""}
      </FieldLabel>
      <Input id={id} {...props} />
    </Field>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  value,
  onChange,
  className,
  children,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {/* Radix Select does not submit with the form, so mirror it here. */}
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </Field>
  );
}

export function RegisterForm({
  locale,
  initialRole = "user",
  labels,
}: {
  locale: string;
  initialRole?: Role;
  labels: RegisterLabels;
}) {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(signUpAction, {});
  const [role, setRole] = useState<Role>(initialRole);
  const [applyForContract, setApplyForContract] = useState(false);
  const [values, setValues] = useState(EMPTY);

  // Controlled values survive React 19's automatic form reset after an error.
  const set = (name: FieldName) => (value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));
  const bind = (name: FieldName) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e: ChangeEvent<HTMLInputElement>) => set(name)(e.target.value),
  });

  // Contract fields exist only for brand/blogger and only when opted in.
  const contractOpen = role !== "user" && applyForContract;

  const tabs: {
    role: Role;
    icon: typeof User;
    title: string;
    description: string;
  }[] = [
    {
      role: "user",
      icon: User,
      title: labels.user,
      description: labels.userDescription,
    },
    {
      role: "brand",
      icon: BriefcaseBusiness,
      title: labels.brand,
      description: labels.brandDescription,
    },
    {
      role: "blogger",
      icon: Sparkles,
      title: labels.blogger,
      description: labels.bloggerDescription,
    },
  ];
  const activeTitle = tabs.find((tab) => tab.role === role)!.title;

  if (state.success) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-10 text-center shadow-lg dark:shadow-2xl relative overflow-hidden transition-colors">
        <CheckCircle2 className="mx-auto size-16 text-primary" />
        <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900 dark:text-zinc-100">
          {labels.successTitle}
        </h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
          {contractOpen ? labels.applicationReceived : labels.successMessage}
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
          <div className="grid grid-cols-1 gap-3 border p-1.5 backdrop-blur-sm rounded-xl sm:grid-cols-3">
            {tabs.map(({ role: tabRole, icon: Icon, title, description }) => (
              <button
                key={tabRole}
                type="button"
                aria-pressed={role === tabRole}
                onClick={() => {
                  setRole(tabRole);
                  setApplyForContract(false);
                }}
                className={tabClass(role === tabRole)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    className={cn(
                      "size-4",
                      role === tabRole ? "text-primary" : "text-gray-400",
                    )}
                  />
                  <span className="font-black uppercase tracking-wider text-sm">
                    {title}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 hidden sm:block leading-relaxed">
                  {description}
                </p>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="grid gap-6">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="role" value={role} />
            <input
              type="hidden"
              name="applyForContract"
              value={String(contractOpen)}
            />

            {state.error && (
              <div
                role="alert"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400 font-semibold"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            {/* Account details */}
            <div>
              <SectionTitle icon={<User className="size-3.5 text-primary" />}>
                {labels.accountDetails}
              </SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label={labels.name}
                  required
                  autoComplete="name"
                  {...bind("name")}
                />
                <TextField
                  label={labels.email}
                  type="email"
                  required
                  autoComplete="email"
                  {...bind("email")}
                />
                <TextField
                  label={labels.password}
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  {...bind("password")}
                />
                <TextField
                  label={labels.phone}
                  type="tel"
                  autoComplete="tel"
                  {...bind("phone")}
                />
                <TextField label={labels.city} {...bind("city")} />
                <TextField
                  label={labels.governorate}
                  {...bind("governorate")}
                />
              </div>
            </div>

            {/* Optional contract toggle (brand / blogger only) */}
            {role !== "user" && (
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-primary bg-primary/10">
                <input
                  type="checkbox"
                  id="applyContract"
                  checked={applyForContract}
                  onChange={(e) => setApplyForContract(e.target.checked)}
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="applyContract"
                  className="text-xs font-semibold text-gray-400 cursor-pointer select-none"
                >
                  {labels.contractPrompt}
                </label>
              </div>
            )}

            {/* Contract application fields */}
            {contractOpen && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <SectionTitle
                  icon={<FileText className="size-3.5 text-primary" />}
                >
                  {role === "brand"
                    ? labels.brandApplication
                    : labels.creatorApplication}
                </SectionTitle>

                {role === "brand" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label={labels.company}
                      required
                      {...bind("company")}
                    />
                    <TextField
                      label={labels.website}
                      type="url"
                      {...bind("website")}
                    />
                    <SelectField
                      name="industry"
                      label={labels.industry}
                      placeholder={labels.selectIndustry}
                      value={values.industry}
                      onChange={set("industry")}
                    >
                      {INDUSTRIES.map(([value, key]) => (
                        <SelectItem key={value} value={value}>
                          {labels.industries[key]}
                        </SelectItem>
                      ))}
                    </SelectField>
                    <SelectField
                      name="goal"
                      label={labels.goal}
                      placeholder={labels.selectGoal}
                      value={values.goal}
                      onChange={set("goal")}
                    >
                      {GOALS.map(([value, key]) => (
                        <SelectItem key={value} value={value}>
                          {labels.goals[key]}
                        </SelectItem>
                      ))}
                    </SelectField>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label={labels.handles}
                      required
                      {...bind("handles")}
                    />
                    <SelectField
                      name="niche"
                      label={labels.niche}
                      placeholder={labels.selectNiche}
                      value={values.niche}
                      onChange={set("niche")}
                    >
                      <SelectItem value="All">{labels.allContent}</SelectItem>
                      {NICHES.map(([value, key]) => (
                        <SelectItem key={value} value={value}>
                          {labels.niches[key]}
                        </SelectItem>
                      ))}
                    </SelectField>
                    <TextField
                      label={labels.portfolio}
                      type="url"
                      {...bind("portfolio")}
                    />
                    <SelectField
                      name="followers"
                      label={labels.followersRange}
                      placeholder={labels.selectFollowers}
                      value={values.followers}
                      onChange={set("followers")}
                    >
                      {FOLLOWERS.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectField>
                    <SelectField
                      name="monthlyViews"
                      label={labels.monthlyViews}
                      placeholder={labels.selectViewsRange}
                      value={values.monthlyViews}
                      onChange={set("monthlyViews")}
                      className="sm:col-span-2"
                    >
                      {VIEWS.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value} {labels.viewsReach}
                        </SelectItem>
                      ))}
                    </SelectField>
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
                  {contractOpen ? labels.submitApplication : labels.submit} (
                  {activeTitle})
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