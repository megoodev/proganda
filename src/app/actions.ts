"use server";

import { validateSession } from "@/lib/auth";
import { serviceTiers, type ServiceTierId } from "@/lib/data";
import { z } from "zod";

export type ActionState = {
  status: "idle" | "success" | "error" | "unauthorized";
  message?: string;
  fields?: Record<string, string>;
};

export type RegistrationState = ActionState & { role?: "brand" | "creator" };

const registrationSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("brand"),
    name: z.string().trim().min(1),
    email: z.string().email(),
    company: z.string().trim().min(1),
    industry: z.string().trim().min(1),
    budget: z.string().trim().min(1),
    goal: z.string().trim().min(1),
  }),
  z.object({
    role: z.literal("creator"),
    name: z.string().trim().min(1),
    email: z.string().email(),
    handles: z.string().trim().min(1),
    niche: z.string().trim().min(1),
    portfolio: z.string().trim().min(1),
    monthlyViews: z.string().trim().min(1),
  }),
]);

type BookingInput = {
  name: string;
  email: string;
  company: string;
  brief: string;
  selectedTier: ServiceTierId;
  appliedDiscountCode?: string;
};
type CreatorInput = {
  name: string;
  email: string;
  handle: string;
  niche: string;
};

function validateContactFields(input: Record<string, string>) {
  const fields: Record<string, string> = {};
  if (!input.name.trim()) fields.name = "Add your name";
  if (!input.email.includes("@")) fields.email = "Use a valid email";
  return fields;
}

export async function submitBooking(
  _state: ActionState,
  input: BookingInput,
): Promise<ActionState> {
  const session = await validateSession("brand");
  if (!session.authorized)
    return {
      status: "unauthorized",
      message: "Booking access is currently unavailable.",
    };
  const fields = validateContactFields(input);
  if (!input.company.trim()) fields.company = "Add your company";
  if (!input.brief.trim()) fields.brief = "Tell us what you want to make";
  if (!serviceTiers.some((tier) => tier.id === input.selectedTier)) {
    fields.selectedTier = "Choose a service tier";
  }
  if (
    input.appliedDiscountCode &&
    !["LAUNCH10", "BETA15", "PAIR3"].includes(
      input.appliedDiscountCode.trim().toUpperCase(),
    )
  ) {
    fields.appliedDiscountCode = "That offer code is not active";
  }
  if (Object.keys(fields).length)
    return {
      status: "error",
      fields,
      message: "Check the highlighted fields.",
    };
  return {
    status: "success",
    message:
      "Brief received. Our production team will be in touch within one business day.",
  };
}

export async function submitCreatorApplication(
  _state: ActionState,
  input: CreatorInput,
): Promise<ActionState> {
  const session = await validateSession("creator");
  if (!session.authorized)
    return {
      status: "unauthorized",
      message: "Creator applications are currently unavailable.",
    };
  const fields = validateContactFields(input);
  if (!input.handle.trim()) fields.handle = "Add a social handle";
  if (!input.niche.trim()) fields.niche = "Choose your lane";
  if (Object.keys(fields).length)
    return {
      status: "error",
      fields,
      message: "Check the highlighted fields.",
    };
  return {
    status: "success",
    message:
      "Application received. We will review your work and reach out soon.",
  };
}

export async function registerUserAction(
  _state: RegistrationState,
  input: unknown,
): Promise<RegistrationState> {
  const session = await validateSession();
  if (!session.authorized) {
    return {
      status: "unauthorized",
      message: "Registration access is currently unavailable.",
    };
  }
  const result = registrationSchema.safeParse(input);
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fields[field])
        fields[field] = "Complete this field";
    }
    return {
      status: "error",
      fields,
      message: "Check the highlighted fields.",
    };
  }
  return {
    status: "success",
    role: result.data.role,
    message: "Your ProGanda portal is ready. We will be in touch shortly.",
  };
}

export async function selectSubscriptionAction(
  _state: ActionState,
  input: { plan: string; role: "brand" | "creator" },
): Promise<ActionState> {
  const session = await validateSession(input.role);
  if (!session.authorized)
    return {
      status: "unauthorized",
      message: "Sign in to manage your subscription.",
    };
  if (!input.plan.trim())
    return {
      status: "error",
      fields: { plan: "Choose a plan" },
      message: "Choose a plan to continue.",
    };
  return { status: "success", message: "Your plan request has been received." };
}
