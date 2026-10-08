"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isStaffRole, sanitizeSignupRole } from "@/lib/roles";
import { assertSafeHttpUrl } from "@/lib/sanitize";
import {
  bootstrapAccountProfilesFromAuth,
  rollbackFailedSignup,
} from "@/data/profiles";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export type AuthActionState = {
  error?: string;
  success?: boolean;
};

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const text = (max: number) => z.string().trim().max(max).optional().default("");

const isSafeUrl = (value: string) => {
  try {
    assertSafeHttpUrl(value);
    return true;
  } catch {
    return false;
  }
};

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .default("")
  .refine((v) => v === "" || isSafeUrl(v), "Invalid URL");

const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128),
    role: z.enum(["user", "brand", "blogger"]),
    applyForContract: z.enum(["true", "false"]).optional().default("false"),
    phone: text(40),
    city: text(80),
    governorate: text(80),
    company: text(160),
    industry: text(120),
    goal: text(1200),
    website: optionalUrl,
    niche: text(120),
    handles: text(1000),
    portfolio: optionalUrl,
    followers: text(80),
    monthlyViews: text(80),
  })
  .superRefine((data, ctx) => {
    if (data.applyForContract !== "true") return;
    if (data.role === "brand" && !data.company) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Required" });
    }
    if (data.role === "blogger" && !data.handles) {
      ctx.addIssue({ code: "custom", path: ["handles"], message: "Required" });
    }
  });

function safeNext(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (value.startsWith("/\\")) return null;
  return value;
}

function readLocale(formData: FormData): string {
  const locale = formData.get("locale");
  return typeof locale === "string" && locale.length > 0 ? locale : "en";
}

function withDevDetail(message: string, error: unknown): string {
  if (process.env.NODE_ENV === "production") return message;
  const e = error as { body?: { message?: string }; message?: string };
  const detail = (e?.body?.message ?? e?.message ?? String(error))
    .split("\n")
    .filter(Boolean)
    .slice(-3)
    .join(" ")
    .slice(0, 300);
  return `${message} [${detail}]`;
}

function isUserExistsError(error: unknown): boolean {
  const e = error as
    | { body?: { code?: string; message?: string }; message?: string }
    | undefined;
  return (
    e?.body?.code?.startsWith("USER_ALREADY_EXISTS") === true ||
    /already/i.test(e?.body?.message ?? e?.message ?? "")
  );
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const t = await getTranslations({ locale, namespace: "auth" });
  const reqHeaders = await headers();
  const loginKey = await clientKey(reqHeaders);

  // ✅ استخدام await مع rateLimit
  const limitRes = await rateLimit(`login:${loginKey}`, 10, 60_000);
  if (!limitRes.ok) {
    return { error: t("rateLimited") };
  }

  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: t("checkForm") };
  }

  const next = safeNext(formData.get("next"));
  const adminPath = `/${locale}/admin`;

  let target = next ?? `/${locale}/`;
  try {
    const result = await auth.api.signInEmail({
      body: parsed.data,
      headers: reqHeaders,
    });
    const role = (result?.user as { role?: string } | undefined)?.role;
    if (isStaffRole(role)) {
      target = next ?? adminPath;
    } else if (
      next === adminPath ||
      next?.startsWith(`${adminPath}/`)
    ) {
      target = `/${locale}/`;
    }
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status?: number }).status === 401
    ) {
      return { error: t("invalidCredentials") };
    }
    return { error: t("signInRetry") };
  }

  redirect(target);
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const t = await getTranslations({ locale, namespace: "auth" });

  const signupLimit = process.env.NODE_ENV === "production" ? 5 : 100;
  const reqHeaders = await headers();
  const signupKey = await clientKey(reqHeaders);

  // ✅ استخدام await لتلقي نتيجة Promise السليمة
  const limitRes = await rateLimit(`signup:${signupKey}`, signupLimit, 60 * 60_000);
  if (!limitRes.ok) {
    return { error: t("rateLimited") };
  }

  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    console.error("[signUp] validation failed:", parsed.error.flatten());
    return { error: t("checkForm") };
  }
  const data = parsed.data;

  const role = sanitizeSignupRole(data.role);
  const applyForContract = data.applyForContract === "true" && role !== "USER";

  let userId: string;
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      headers: reqHeaders,
    });
    userId = result.user.id;
  } catch (error) {
    console.error("[signUp] auth.api.signUpEmail failed:", error);
    if (isUserExistsError(error)) {
      return { error: t("accountExists") };
    }
    return { error: withDevDetail(t("createAccountRetry"), error) };
  }

  try {
    await bootstrapAccountProfilesFromAuth({
      userId,
      email: data.email,
      role,
      applyForContract,
      phone: data.phone,
      city: data.city,
      governorate: data.governorate,
      company: data.company,
      industry: data.industry,
      goal: data.goal,
      website: data.website,
      niche: data.niche,
      handles: data.handles,
      portfolio: data.portfolio,
      followers: data.followers,
      monthlyViews: data.monthlyViews,
    });
  } catch (error) {
    console.error("[signUp] profile bootstrap failed:", error);
    await rollbackFailedSignup(userId);
    return { error: withDevDetail(t("createAccountRetry"), error) };
  }

  return { success: true };
}

export async function signOutAction(locale: string) {
  try {
    const reqHeaders = await headers();
    await auth.api.signOut({ headers: reqHeaders });
  } catch {
    // Session already gone; fall through to the login page.
  }
  redirect(`/${locale}/auth/login`);
}