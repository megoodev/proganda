"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isStaffRole } from "@/lib/roles";

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

const signUpSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["brand", "blogger"]),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  goal: z.string().optional().default(""),
  website: z.string().optional().default(""),
  niche: z.string().optional().default(""),
  handles: z.string().optional().default(""),
  portfolio: z.string().optional().default(""),
  monthlyViews: z.string().optional().default(""),
});

function safeNext(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

function readLocale(formData: FormData): string {
  const locale = formData.get("locale");
  return typeof locale === "string" && locale.length > 0 ? locale : "en";
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check your credentials.",
    };
  }

  const locale = readLocale(formData);
  const next = safeNext(formData.get("next"));

  // Demo mode: no database required, sign straight into the CMS.
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    redirect(next ?? `/${locale}/admin`);
  }

  let target = next ?? `/${locale}/`;
  try {
    const result = await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
    const role = (result?.user as { role?: string } | undefined)?.role;
    if (!next && isStaffRole(role)) {
      target = `/${locale}/admin`;
    }
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status?: number }).status === 401
    ) {
      return { error: "Invalid email or password." };
    }
    return { error: "Could not sign you in. Please try again." };
  }

  redirect(target);
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return { success: true };
  }

  try {
    await auth.api.signUpEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      typeof (error as { message?: string }).message === "string" &&
      error.message.toLowerCase().includes("already")
    ) {
      return { error: "An account with this email already exists." };
    }
    return { error: "Could not create your account. Please try again." };
  }

  return { success: true };
}

export async function signOutAction(locale: string) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
    try {
      await auth.api.signOut({ headers: await headers() });
    } catch {
      // Session already gone; fall through to the login page.
    }
  }
  redirect(`/${locale}/auth/login`);
}
