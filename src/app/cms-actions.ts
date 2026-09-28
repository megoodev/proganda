"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { requireAdmin, requireStaff } from "@/lib/auth";
import {
  demoDeleteBrand,
  demoDeleteCreator,
  demoDeleteService,
  demoSaveBrand,
  demoSaveCreator,
  demoSaveService,
  demoSetUserBanned,
  demoSetUserRole,
  demoUpdateInquiryStatus,
  isDemoMode,
} from "@/lib/admin-data";
import { isStaffRole, STAFF_ROLES } from "@/lib/roles";
import {
  assertHexColor,
  assertSafeHttpUrl,
  assertSlug,
  splitList,
} from "@/lib/sanitize";

export type CmsActionState = {
  status: "idle" | "success" | "error" | "unauthorized";
  message?: string;
};

async function staffOrThrow() {
  const staff = await requireStaff();
  if (!staff) {
    return null;
  }
  return staff;
}

async function audit(
  actor: { id: string; email: string },
  action: string,
  entity: string,
  entityId?: string,
  metadata?: Prisma.InputJsonValue,
) {
  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      actorEmail: actor.email,
      action,
      entity,
      entityId,
      metadata,
    },
  });
}

function fail(message: string): CmsActionState {
  return { status: "error", message };
}

const creatorSchema = z.object({
  slug: z.string().min(1),
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
  slug: z.string().min(1),
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

const tierSchema = z.object({
  id: z.string().min(1),
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

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function saveCreatorAction(
  _state: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };

  const parsed = creatorSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the creator fields and try again.");

  try {
    const slug = assertSlug(parsed.data.slug);
    const image = assertSafeHttpUrl(parsed.data.image);
    const accent = assertHexColor(parsed.data.accent);
    const platforms = splitList(parsed.data.platforms);
    const id = String(formData.get("id") || "");
    const data = {
      slug,
      name: parsed.data.name,
      handle: parsed.data.handle,
      niche: parsed.data.niche,
      platforms,
      reach: parsed.data.reach,
      engagement: parsed.data.engagement,
      location: parsed.data.location,
      image,
      accent,
      bio: parsed.data.bio ?? "",
      published: parsed.data.published === "on",
      sortOrder: parsed.data.sortOrder ?? 0,
    };

    const record = isDemoMode()
      ? demoSaveCreator(staff, data, id || undefined)
      : id
        ? await prisma.creator.update({ where: { id }, data })
        : await prisma.creator.create({ data });

    if (!isDemoMode()) {
      await audit(staff, id ? "update" : "create", "creator", record.id, {
        slug,
      });
    }
    revalidatePublic();
    return { status: "success", message: "Creator saved." };
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Could not save creator.");
  }
}

export async function deleteCreatorAction(id: string): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };
  if (!id) return fail("Missing creator id.");
  if (isDemoMode()) {
    demoDeleteCreator(staff, id);
    revalidatePublic();
    return { status: "success", message: "Creator deleted." };
  }
  await prisma.creator.delete({ where: { id } });
  await audit(staff, "delete", "creator", id);
  revalidatePublic();
  return { status: "success", message: "Creator deleted." };
}

export async function saveBrandAction(
  _state: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };

  const parsed = brandSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the brand fields and try again.");

  try {
    const slug = assertSlug(parsed.data.slug);
    const color = assertHexColor(parsed.data.color);
    const services = splitList(parsed.data.services);
    const id = String(formData.get("id") || "");
    const data = {
      slug,
      name: parsed.data.name,
      industry: parsed.data.industry,
      campaign: parsed.data.campaign,
      description: parsed.data.description,
      services,
      views: parsed.data.views,
      roi: parsed.data.roi,
      color,
      published: parsed.data.published === "on",
      sortOrder: parsed.data.sortOrder ?? 0,
    };
    const record = isDemoMode()
      ? demoSaveBrand(staff, data, id || undefined)
      : id
        ? await prisma.brand.update({ where: { id }, data })
        : await prisma.brand.create({ data });
    if (!isDemoMode()) {
      await audit(staff, id ? "update" : "create", "brand", record.id, { slug });
    }
    revalidatePublic();
    return { status: "success", message: "Brand saved." };
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Could not save brand.");
  }
}

export async function deleteBrandAction(id: string): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };
  if (!id) return fail("Missing brand id.");
  if (isDemoMode()) {
    demoDeleteBrand(staff, id);
    revalidatePublic();
    return { status: "success", message: "Brand deleted." };
  }
  await prisma.brand.delete({ where: { id } });
  await audit(staff, "delete", "brand", id);
  revalidatePublic();
  return { status: "success", message: "Brand deleted." };
}

export async function saveServiceAction(
  _state: CmsActionState,
  formData: FormData,
): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };

  const parsed = tierSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the service fields and try again.");

  try {
    const id = assertSlug(parsed.data.id);
    const data = {
      id,
      name: parsed.data.name,
      eyebrow: parsed.data.eyebrow,
      scope: parsed.data.scope,
      offer: parsed.data.offer,
      features: splitList(parsed.data.features),
      savingsRate: parsed.data.savingsRate,
      accent: parsed.data.accent,
      published: parsed.data.published === "on",
      sortOrder: parsed.data.sortOrder ?? 0,
    };
    if (isDemoMode()) {
      demoSaveService(staff, data);
    } else {
      await prisma.serviceTier.upsert({
        where: { id },
        update: data,
        create: data,
      });
      await audit(staff, "upsert", "service", id);
    }
    revalidatePublic();
    return { status: "success", message: "Service plan saved." };
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Could not save service.");
  }
}

export async function deleteServiceAction(id: string): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };
  if (!id) return fail("Missing service id.");
  if (isDemoMode()) {
    demoDeleteService(staff, id);
    revalidatePublic();
    return { status: "success", message: "Service plan deleted." };
  }
  await prisma.serviceTier.delete({ where: { id } });
  await audit(staff, "delete", "service", id);
  revalidatePublic();
  return { status: "success", message: "Service plan deleted." };
}

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "read" | "archived",
): Promise<CmsActionState> {
  const staff = await staffOrThrow();
  if (!staff) return { status: "unauthorized", message: "Staff access required." };
  if (isDemoMode()) {
    demoUpdateInquiryStatus(staff, id, status);
    revalidatePath("/admin/inquiries");
    return { status: "success", message: "Inquiry updated." };
  }
  await prisma.inquiry.update({ where: { id }, data: { status } });
  await audit(staff, "update", "inquiry", id, { status });
  revalidatePath("/admin/inquiries");
  return { status: "success", message: "Inquiry updated." };
}

export async function setUserRoleAction(
  userId: string,
  role: string,
): Promise<CmsActionState> {
  const adminUser = await requireAdmin();
  if (!adminUser) {
    return { status: "unauthorized", message: "Admin access required." };
  }
  const allowed = ["brand", "blogger", "creator", ...STAFF_ROLES];
  if (!allowed.includes(role)) return fail("Invalid role.");
  if (isDemoMode()) {
    demoSetUserRole(adminUser, userId, role);
    revalidatePath("/admin/users");
    return { status: "success", message: "User role updated." };
  }
  if (userId === adminUser.id && !isStaffRole(role)) {
    return fail("You cannot remove your own staff access.");
  }
  if (role !== "admin") {
    const remainingAdmins = await prisma.user.count({
      where: { role: "admin", NOT: { id: userId } },
    });
    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (target?.role === "admin" && remainingAdmins < 1) {
      return fail("Keep at least one admin account.");
    }
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });
  await audit(adminUser, "set-role", "user", userId, { role });
  revalidatePath("/admin/users");
  return { status: "success", message: "User role updated." };
}

export async function setUserBannedAction(
  userId: string,
  banned: boolean,
): Promise<CmsActionState> {
  const adminUser = await requireAdmin();
  if (!adminUser) {
    return { status: "unauthorized", message: "Admin access required." };
  }
  if (isDemoMode()) {
    demoSetUserBanned(adminUser, userId, banned);
    revalidatePath("/admin/users");
    return { status: "success", message: banned ? "User banned." : "User restored." };
  }
  if (userId === adminUser.id) return fail("You cannot ban your own account.");
  await prisma.user.update({
    where: { id: userId },
    data: {
      banned,
      banReason: banned ? "Suspended by admin" : null,
      banExpires: null,
    },
  });
  await audit(adminUser, banned ? "ban" : "unban", "user", userId);
  revalidatePath("/admin/users");
  return { status: "success", message: banned ? "User banned." : "User restored." };
}
