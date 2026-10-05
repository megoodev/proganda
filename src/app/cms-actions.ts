"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UserRole } from "@/generated/prisma/enums";
import {
  deleteBrandRecord,
  deleteCreatorRecord,
  deleteServiceTierRecord,
  saveBrandRecord,
  saveCreatorRecord,
  saveServiceTierRecord,
  setAccountBanned,
  setAccountRole,
  updateContactMessageStatus,
  updateJobApplicationStatus,
} from "@/data/admin";
import { AccessError, requireRole } from "@/lib/dal";
import {
  assertHexColor,
  assertSafeHttpUrl,
  assertSlug,
  splitList,
} from "@/lib/sanitize";

export type CmsActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

function actionError(error: unknown): CmsActionResult {
  if (error instanceof AccessError) {
    return { success: false, error: error.code };
  }
  return { success: false, error: "REQUEST_FAILED" };
}

function revalidateContent() {
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "page");
}

const creatorSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  handle: z.string().trim().min(1).max(80),
  niche: z.string().trim().min(1).max(40),
  platforms: z.string().trim().min(1),
  reach: z.string().trim().min(1).max(40),
  engagement: z.string().trim().min(1).max(40),
  location: z.string().trim().min(1).max(80),
  image: z.string().trim().min(1).max(500),
  accent: z.string().trim().min(1).max(16),
  bio: z.string().trim().max(2000).optional(),
  published: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

const brandSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  industry: z.string().trim().min(1).max(80),
  campaign: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(2000),
  services: z.string().trim().min(1),
  views: z.string().trim().min(1).max(40),
  roi: z.string().trim().min(1).max(40),
  color: z.string().trim().min(1).max(16),
  published: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

const serviceTierSchema = z.object({
  id: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(80),
  eyebrow: z.string().trim().min(1).max(80),
  scope: z.string().trim().min(1).max(500),
  offer: z.string().trim().min(1).max(240),
  features: z.string().trim().min(1),
  savingsRate: z.coerce.number().min(0).max(1),
  accent: z.enum(["lime", "purple"]),
  published: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

export async function saveCreatorAction(
  _state: CmsActionResult,
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = creatorSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { success: false, error: "INVALID_INPUT" };
    const { id, ...input } = parsed.data;
    const data = {
      ...input,
      slug: assertSlug(input.slug),
      image: assertSafeHttpUrl(input.image),
      accent: assertHexColor(input.accent),
      platforms: splitList(input.platforms),
      bio: input.bio ?? "",
      published: input.published === "on",
      sortOrder: input.sortOrder ?? 0,
    };
    const saved = await saveCreatorRecord(data, id);
    revalidateContent();
    return { success: true, data: saved };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteCreatorAction(
  id: string,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsedId = z.string().min(1).max(80).parse(id);
    const deleted = await deleteCreatorRecord(parsedId);
    revalidateContent();
    return { success: true, data: deleted };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveBrandAction(
  _state: CmsActionResult,
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = brandSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { success: false, error: "INVALID_INPUT" };
    const { id, ...input } = parsed.data;
    const data = {
      ...input,
      slug: assertSlug(input.slug),
      color: assertHexColor(input.color),
      services: splitList(input.services),
      published: input.published === "on",
      sortOrder: input.sortOrder ?? 0,
    };
    const saved = await saveBrandRecord(data, id);
    revalidateContent();
    return { success: true, data: saved };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteBrandAction(id: string): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsedId = z.string().min(1).max(80).parse(id);
    const deleted = await deleteBrandRecord(parsedId);
    revalidateContent();
    return { success: true, data: deleted };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveServiceAction(
  _state: CmsActionResult,
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = serviceTierSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { success: false, error: "INVALID_INPUT" };
    const input = parsed.data;
    const data = {
      ...input,
      id: assertSlug(input.id),
      features: splitList(input.features),
      published: input.published === "on",
      sortOrder: input.sortOrder ?? 0,
    };
    const saved = await saveServiceTierRecord(data);
    revalidateContent();
    return { success: true, data: saved };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteServiceAction(
  id: string,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsedId = z.string().min(1).max(80).parse(id);
    const deleted = await deleteServiceTierRecord(parsedId);
    revalidateContent();
    return { success: true, data: deleted };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateContactMessageStatusAction(
  id: string,
  status: "NEW" | "IN_REVIEW" | "REPLIED" | "ARCHIVED",
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = z
      .object({
        id: z.string().min(1),
        status: z.enum(["NEW", "IN_REVIEW", "REPLIED", "ARCHIVED"]),
      })
      .parse({ id, status });
    const updated = await updateContactMessageStatus(parsed.id, parsed.status);
    revalidateContent();
    return { success: true, data: updated };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateJobApplicationStatusAction(
  id: string,
  status: "NEW" | "IN_REVIEW" | "ACCEPTED" | "REJECTED",
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = z
      .object({
        id: z.string().min(1),
        status: z.enum(["NEW", "IN_REVIEW", "ACCEPTED", "REJECTED"]),
      })
      .parse({ id, status });
    const updated = await updateJobApplicationStatus(parsed.id, parsed.status);
    revalidateContent();
    return { success: true, data: updated };
  } catch (error) {
    return actionError(error);
  }
}

export async function setUserRoleAction(
  userId: string,
  role: string,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = z
      .object({ userId: z.string().min(1), role: z.nativeEnum(UserRole) })
      .parse({ userId, role });
    const updated = await setAccountRole(parsed.userId, parsed.role);
    revalidatePath("/dashboard", "page");
    return { success: true, data: updated };
  } catch (error) {
    return actionError(error);
  }
}

export async function setUserBannedAction(
  userId: string,
  banned: boolean,
): Promise<CmsActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = z
      .object({ userId: z.string().min(1), banned: z.boolean() })
      .parse({ userId, banned });
    const updated = await setAccountBanned(parsed.userId, parsed.banned);
    revalidatePath("/dashboard", "page");
    return { success: true, data: updated };
  } catch (error) {
    return actionError(error);
  }
}
