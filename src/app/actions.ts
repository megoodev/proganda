"use server";

import { validateSession } from "@/lib/auth";
import { serviceTiers, type ServiceTierId } from "@/lib/data";

export type ActionState = {
  status: "idle" | "success" | "error" | "unauthorized";
  message?: string;
  fields?: Record<string, string>;
};

type BookingInput = {
  name: string;
  email: string;
  company: string;
  brief: string;
  selectedTier: ServiceTierId;
  appliedDiscountCode?: string;
};
type CreatorInput = { name: string; email: string; handle: string; niche: string };

function validateContactFields(input: Record<string, string>) {
  const fields: Record<string, string> = {};
  if (!input.name.trim()) fields.name = "Add your name";
  if (!input.email.includes("@")) fields.email = "Use a valid email";
  return fields;
}

export async function submitBooking(_state: ActionState, input: BookingInput): Promise<ActionState> {
  const session = await validateSession("brand");
  if (!session.authorized) return { status: "unauthorized", message: "Booking access is currently unavailable." };
  const fields = validateContactFields(input);
  if (!input.company.trim()) fields.company = "Add your company";
  if (!input.brief.trim()) fields.brief = "Tell us what you want to make";
  if (!serviceTiers.some((tier) => tier.id === input.selectedTier)) {
    fields.selectedTier = "Choose a service tier";
  }
  if (input.appliedDiscountCode && !["LAUNCH10", "BETA15", "PAIR3"].includes(input.appliedDiscountCode.trim().toUpperCase())) {
    fields.appliedDiscountCode = "That offer code is not active";
  }
  if (Object.keys(fields).length) return { status: "error", fields, message: "Check the highlighted fields." };
  return { status: "success", message: "Brief received. Our production team will be in touch within one business day." };
}

export async function submitCreatorApplication(_state: ActionState, input: CreatorInput): Promise<ActionState> {
  const session = await validateSession("creator");
  if (!session.authorized) return { status: "unauthorized", message: "Creator applications are currently unavailable." };
  const fields = validateContactFields(input);
  if (!input.handle.trim()) fields.handle = "Add a social handle";
  if (!input.niche.trim()) fields.niche = "Choose your lane";
  if (Object.keys(fields).length) return { status: "error", fields, message: "Check the highlighted fields." };
  return { status: "success", message: "Application received. We will review your work and reach out soon." };
}