import "server-only";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/dal";
import type {
  AdPlacement,
  ApplicantType,
  ContactMessageStatus,
  JobApplicationStatus,
  RecordStatus,
  UserRole,
} from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";

export type AdminUserDTO = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  banned: boolean | null;
  createdAt: Date;
};

export type AdminContactMessageDTO = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: Date;
};

export type AdminJobApplicationDTO = {
  id: string;
  type: ApplicantType;
  status: JobApplicationStatus;
  openingId: string | null;
  name: string;
  email: string;
  phone: string;
  age: number | null;
  city: string | null;
  governorate: string | null;
  gender: string | null;
  fieldOfWork: string | null;
  socialLinks: string[];
  portfolioUrl: string | null;
  message: string | null;
  resumeFile: {
    id: string;
    originalName: string;
    contentType: string;
    sizeBytes: number;
  } | null;
  createdAt: Date;
};

export type AdminAdDTO = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: Prisma.JsonValue;
  status: RecordStatus;
  placement: AdPlacement;
  publishedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminServiceDTO = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  details: string | null;
  priceLabel: string | null;
  status: RecordStatus;
  sortOrder: number;
  updatedAt: Date;
};

export type CreatorWriteDTO = {
  slug: string;
  name: string;
  handle: string;
  niche: string;
  platforms: string[];
  reach: string;
  engagement: string;
  location: string;
  image: string;
  accent: string;
  bio: string;
  published: boolean;
  sortOrder: number;
};

export type BrandWriteDTO = {
  slug: string;
  name: string;
  industry: string;
  campaign: string;
  description: string;
  services: string[];
  views: string;
  roi: string;
  color: string;
  published: boolean;
  sortOrder: number;
};

export type ServiceTierWriteDTO = {
  id: string;
  name: string;
  eyebrow: string;
  scope: string;
  offer: string;
  features: string[];
  savingsRate: number;
  accent: string;
  published: boolean;
  sortOrder: number;
};

async function writeAudit(
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

export async function getAdminOverview() {
  await requireRole("ADMIN");
  const [users, bloggers, brands, services, messages, applications, ads] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "BLOGGER" } }),
      prisma.user.count({ where: { role: "BRAND" } }),
      prisma.service.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.jobApplication.count({ where: { status: "NEW" } }),
      prisma.ad.count({ where: { status: "PUBLISHED" } }),
    ]);

  return {
    users,
    bloggers,
    brands,
    services,
    newMessages: messages,
    newApplications: applications,
    publishedAds: ads,
  };
}

export async function listAdminUsers(): Promise<AdminUserDTO[]> {
  await requireRole("ADMIN");
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      banned: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function listContactMessages(): Promise<AdminContactMessageDTO[]> {
  await requireRole("ADMIN");
  return prisma.contactMessage.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      subject: true,
      message: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function listJobApplications(): Promise<AdminJobApplicationDTO[]> {
  await requireRole("ADMIN");
  return prisma.jobApplication.findMany({
    select: {
      id: true,
      type: true,
      status: true,
      openingId: true,
      name: true,
      email: true,
      phone: true,
      age: true,
      city: true,
      governorate: true,
      gender: true,
      fieldOfWork: true,
      socialLinks: true,
      portfolioUrl: true,
      message: true,
      resumeFile: {
        select: {
          id: true,
          originalName: true,
          contentType: true,
          sizeBytes: true,
        },
      },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function listAdminAds(): Promise<AdminAdDTO[]> {
  await requireRole("ADMIN");
  return prisma.ad.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      content: true,
      status: true,
      placement: true,
      publishedAt: true,
      expiresAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listAdminServices(): Promise<AdminServiceDTO[]> {
  await requireRole("ADMIN");
  return prisma.service.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      details: true,
      priceLabel: true,
      status: true,
      sortOrder: true,
      updatedAt: true,
    },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus,
) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  await writeAudit(actor, "update-status", "contact-message", row.id, {
    status,
  });
  return { id: row.id, status: row.status };
}

export async function updateJobApplicationStatus(
  id: string,
  status: JobApplicationStatus,
) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.jobApplication.update({
    where: { id },
    data: { status, reviewerId: actor.id },
  });
  await writeAudit(actor, "update-status", "job-application", row.id, {
    status,
  });
  return { id: row.id, status: row.status };
}

export async function setAccountRole(userId: string, role: UserRole) {
  const actor = await requireRole("ADMIN");
  if (userId === actor.id && role !== "ADMIN") {
    throw new Error("You cannot remove your own administrator access.");
  }
  if (role !== "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (target?.role === "ADMIN" && adminCount <= 1) {
      throw new Error("At least one administrator must remain.");
    }
  }
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, role: true },
  });
  await writeAudit(actor, "set-role", "user", user.id, { role });
  return user;
}

export async function setAccountBanned(userId: string, banned: boolean) {
  const actor = await requireRole("ADMIN");
  if (userId === actor.id) throw new Error("You cannot ban your own account.");
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      banned,
      banReason: banned ? "Suspended by admin" : null,
      banExpires: null,
    },
    select: { id: true, banned: true },
  });
  await writeAudit(actor, banned ? "ban" : "unban", "user", user.id);
  return user;
}

export async function saveCreatorRecord(input: CreatorWriteDTO, id?: string) {
  const actor = await requireRole("ADMIN");
  const data = {
    ...input,
    ...(id ? {} : { slug: input.slug }),
  };
  const row = id
    ? await prisma.creator.update({ where: { id }, data })
    : await prisma.creator.create({ data });
  await writeAudit(actor, id ? "update" : "create", "creator", row.id, {
    slug: row.slug,
  });
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    published: row.published,
  };
}

export async function deleteCreatorRecord(id: string) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.creator.delete({
    where: { id },
    select: { id: true },
  });
  await writeAudit(actor, "delete", "creator", row.id);
  return row;
}

export async function saveBrandRecord(input: BrandWriteDTO, id?: string) {
  const actor = await requireRole("ADMIN");
  const row = id
    ? await prisma.brand.update({ where: { id }, data: input })
    : await prisma.brand.create({ data: input });
  await writeAudit(actor, id ? "update" : "create", "brand", row.id, {
    slug: row.slug,
  });
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    published: row.published,
  };
}

export async function deleteBrandRecord(id: string) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.brand.delete({
    where: { id },
    select: { id: true },
  });
  await writeAudit(actor, "delete", "brand", row.id);
  return row;
}

export async function saveServiceTierRecord(input: ServiceTierWriteDTO) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.serviceTier.upsert({
    where: { id: input.id },
    update: input,
    create: input,
  });
  await writeAudit(actor, "upsert", "service-tier", row.id);
  return { id: row.id, name: row.name, published: row.published };
}

export async function deleteServiceTierRecord(id: string) {
  const actor = await requireRole("ADMIN");
  const row = await prisma.serviceTier.delete({
    where: { id },
    select: { id: true },
  });
  await writeAudit(actor, "delete", "service-tier", row.id);
  return row;
}
