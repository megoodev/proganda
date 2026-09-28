import { prisma } from "@/lib/prisma";
import {
  brands as seedBrands,
  creators as seedCreators,
  serviceTiers as seedTiers,
} from "@/lib/data";

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

/* ------------------------------------------------------------------ */
/* Demo row shapes (mirror the Prisma models used by the admin pages)  */
/* ------------------------------------------------------------------ */

export type AdminCreatorRow = {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
};

export type AdminBrandRow = {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
};

export type AdminServiceRow = {
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
  createdAt: Date;
  updatedAt: Date;
};

export type AdminInquiryRow = {
  id: string;
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
  createdAt: Date;
};

export type AdminAuditRow = {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string | null;
  createdAt: Date;
};

/* ------------------------------------------------------------------ */
/* In-memory demo store (module singleton, resets on server restart)   */
/* ------------------------------------------------------------------ */

const BOOT = new Date();

function minutesAgo(minutes: number): Date {
  return new Date(BOOT.getTime() - minutes * 60_000);
}

let demoId = 0;
function nextDemoId(prefix: string): string {
  demoId += 1;
  return `demo-${prefix}-${demoId}`;
}

function demoCreators(): AdminCreatorRow[] {
  return seedCreators.map((creator, index) => ({
    id: creator.id,
    slug: creator.id,
    name: creator.name,
    handle: creator.handle,
    niche: creator.niche,
    platforms: creator.platforms,
    reach: creator.reach,
    engagement: creator.engagement,
    location: creator.location,
    image: creator.image,
    accent: creator.accent,
    bio: `${creator.name} is a ${creator.niche.toLowerCase()} creator producing culture-shaping work with ${creator.reach} total reach.`,
    published: true,
    sortOrder: index,
    createdAt: minutesAgo(60 * 24 * 30),
    updatedAt: minutesAgo(60 * 24 * 2),
  }));
}

function demoBrands(): AdminBrandRow[] {
  return seedBrands.map((brand, index) => ({
    id: brand.slug,
    slug: brand.slug,
    name: brand.name,
    industry: brand.industry,
    campaign: brand.campaign,
    description: brand.description,
    services: brand.services,
    views: brand.views,
    roi: brand.roi,
    color: brand.color,
    published: true,
    sortOrder: index,
    createdAt: minutesAgo(60 * 24 * 30),
    updatedAt: minutesAgo(60 * 24 * 3),
  }));
}

function demoServices(): AdminServiceRow[] {
  return seedTiers.map((tier, index) => ({
    id: tier.id,
    name: tier.name,
    eyebrow: tier.eyebrow,
    scope: tier.scope,
    offer: tier.offer,
    features: tier.features,
    savingsRate: tier.savingsRate,
    accent: tier.accent,
    published: true,
    sortOrder: index,
    createdAt: minutesAgo(60 * 24 * 30),
    updatedAt: minutesAgo(60 * 24 * 5),
  }));
}

function demoInquiries(): AdminInquiryRow[] {
  return [
    {
      id: nextDemoId("inq"),
      name: "Layla Hassan",
      email: "layla@brightlane.co",
      company: "Brightlane Skincare",
      interest: "Creator partnerships",
      message:
        "We are launching a Ramadan skincare line and want 3-5 creators for a two-week push. Budget is flexible for the right roster.",
      status: "new",
      createdAt: minutesAgo(35),
      updatedAt: minutesAgo(35),
    },
    {
      id: nextDemoId("inq"),
      name: "Omar Fathi",
      email: "omar@pulsefit.io",
      company: "PulseFit",
      interest: "Production + design",
      message:
        "Need a studio shoot for 6 short-form product videos plus editing. Can you fit us in this month?",
      status: "new",
      createdAt: minutesAgo(190),
      updatedAt: minutesAgo(190),
    },
    {
      id: nextDemoId("inq"),
      name: "Mona Adel",
      email: "mona@cairoeats.com",
      company: "Cairo Eats",
      interest: "Social media",
      message:
        "Our Instagram engagement dropped 40%. Looking for a full audit and a 90-day content engine.",
      status: "read",
      createdAt: minutesAgo(60 * 26),
      updatedAt: minutesAgo(60 * 20),
    },
    {
      id: nextDemoId("inq"),
      name: "Karim Younis",
      email: "karim@vantacars.eg",
      company: "Vanta Motors Egypt",
      interest: "Brand growth",
      message: "Sponsorship inquiry for our EV launch event in October.",
      status: "archived",
      createdAt: minutesAgo(60 * 24 * 9),
      updatedAt: minutesAgo(60 * 24 * 6),
    },
  ];
}

function demoUsers(): AdminUserRow[] {
  return [
    {
      id: "demo-admin",
      name: "Demo Admin",
      email: "admin@proganda.studio",
      role: "admin",
      banned: false,
      createdAt: minutesAgo(60 * 24 * 60),
    },
    {
      id: nextDemoId("usr"),
      name: "Sara Melhem",
      email: "sara@brightlane.co",
      role: "brand",
      banned: false,
      createdAt: minutesAgo(60 * 24 * 12),
    },
    {
      id: nextDemoId("usr"),
      name: "Youssef Adel",
      email: "youssef.creates@gmail.com",
      role: "creator",
      banned: false,
      createdAt: minutesAgo(60 * 24 * 7),
    },
    {
      id: nextDemoId("usr"),
      name: "Nour Khaled",
      email: "nour@proganda.studio",
      role: "team",
      banned: false,
      createdAt: minutesAgo(60 * 24 * 20),
    },
    {
      id: nextDemoId("usr"),
      name: "Spam Account",
      email: "promo-bot@spammail.xyz",
      role: "brand",
      banned: true,
      createdAt: minutesAgo(60 * 24 * 3),
    },
  ];
}

function demoAudit(): AdminAuditRow[] {
  return [
    {
      id: nextDemoId("aud"),
      actorId: "demo-admin",
      actorEmail: "admin@proganda.studio",
      action: "create",
      entity: "creator",
      entityId: "maya",
      createdAt: minutesAgo(240),
    },
    {
      id: nextDemoId("aud"),
      actorId: "demo-admin",
      actorEmail: "admin@proganda.studio",
      action: "update",
      entity: "brand",
      entityId: "vanta",
      createdAt: minutesAgo(150),
    },
    {
      id: nextDemoId("aud"),
      actorId: "demo-admin",
      actorEmail: "admin@proganda.studio",
      action: "set-role",
      entity: "user",
      entityId: "demo-usr-3",
      createdAt: minutesAgo(90),
    },
    {
      id: nextDemoId("aud"),
      actorId: "demo-admin",
      actorEmail: "admin@proganda.studio",
      action: "ban",
      entity: "user",
      entityId: "demo-usr-4",
      createdAt: minutesAgo(60),
    },
  ];
}

const store = {
  creators: demoCreators(),
  brands: demoBrands(),
  services: demoServices(),
  inquiries: demoInquiries(),
  users: demoUsers(),
  audit: demoAudit(),
};

function pushAudit(
  actor: { id: string; email: string },
  action: string,
  entity: string,
  entityId?: string,
) {
  store.audit.unshift({
    id: nextDemoId("aud"),
    actorId: actor.id,
    actorEmail: actor.email,
    action,
    entity,
    entityId: entityId ?? null,
    createdAt: new Date(),
  });
  if (store.audit.length > 200) store.audit.length = 200;
}

function sortRows<T extends { sortOrder: number; name?: string }>(rows: T[]): T[] {
  return [...rows].sort(
    (a, b) => a.sortOrder - b.sortOrder || (a.name ?? "").localeCompare(b.name ?? ""),
  );
}

/* ------------------------- demo mutations ------------------------- */

export function demoSaveCreator(
  actor: { id: string; email: string },
  data: Omit<AdminCreatorRow, "id" | "createdAt" | "updatedAt">,
  id?: string,
): AdminCreatorRow {
  const now = new Date();
  if (id) {
    const existing = store.creators.find((row) => row.id === id);
    if (!existing) throw new Error("Creator not found.");
    Object.assign(existing, data, { updatedAt: now });
    pushAudit(actor, "update", "creator", existing.id);
    return existing;
  }
  const created: AdminCreatorRow = {
    ...data,
    id: nextDemoId("crt"),
    createdAt: now,
    updatedAt: now,
  };
  store.creators.push(created);
  pushAudit(actor, "create", "creator", created.id);
  return created;
}

export function demoDeleteCreator(actor: { id: string; email: string }, id: string) {
  store.creators = store.creators.filter((row) => row.id !== id);
  pushAudit(actor, "delete", "creator", id);
}

export function demoSaveBrand(
  actor: { id: string; email: string },
  data: Omit<AdminBrandRow, "id" | "createdAt" | "updatedAt">,
  id?: string,
): AdminBrandRow {
  const now = new Date();
  if (id) {
    const existing = store.brands.find((row) => row.id === id);
    if (!existing) throw new Error("Brand not found.");
    Object.assign(existing, data, { updatedAt: now });
    pushAudit(actor, "update", "brand", existing.id);
    return existing;
  }
  const created: AdminBrandRow = {
    ...data,
    id: nextDemoId("brd"),
    createdAt: now,
    updatedAt: now,
  };
  store.brands.push(created);
  pushAudit(actor, "create", "brand", created.id);
  return created;
}

export function demoDeleteBrand(actor: { id: string; email: string }, id: string) {
  store.brands = store.brands.filter((row) => row.id !== id);
  pushAudit(actor, "delete", "brand", id);
}

export function demoSaveService(
  actor: { id: string; email: string },
  data: Omit<AdminServiceRow, "createdAt" | "updatedAt">,
): AdminServiceRow {
  const now = new Date();
  const existing = store.services.find((row) => row.id === data.id);
  if (existing) {
    Object.assign(existing, data, { updatedAt: now });
    pushAudit(actor, "upsert", "service", existing.id);
    return existing;
  }
  const created: AdminServiceRow = { ...data, createdAt: now, updatedAt: now };
  store.services.push(created);
  pushAudit(actor, "create", "service", created.id);
  return created;
}

export function demoDeleteService(actor: { id: string; email: string }, id: string) {
  store.services = store.services.filter((row) => row.id !== id);
  pushAudit(actor, "delete", "service", id);
}

export function demoUpdateInquiryStatus(
  actor: { id: string; email: string },
  id: string,
  status: string,
) {
  const row = store.inquiries.find((item) => item.id === id);
  if (!row) throw new Error("Inquiry not found.");
  row.status = status;
  row.updatedAt = new Date();
  pushAudit(actor, "update", "inquiry", id);
}

export function demoSetUserRole(
  actor: { id: string; email: string },
  userId: string,
  role: string,
) {
  const row = store.users.find((item) => item.id === userId);
  if (!row) throw new Error("User not found.");
  row.role = role;
  pushAudit(actor, "set-role", "user", userId);
}

export function demoSetUserBanned(
  actor: { id: string; email: string },
  userId: string,
  banned: boolean,
) {
  const row = store.users.find((item) => item.id === userId);
  if (!row) throw new Error("User not found.");
  row.banned = banned;
  pushAudit(actor, banned ? "ban" : "unban", "user", userId);
}

/* ------------------------------------------------------------------ */
/* Unified reads: demo store in demo mode, Prisma otherwise            */
/* ------------------------------------------------------------------ */

export async function getAdminCreators(): Promise<AdminCreatorRow[]> {
  if (isDemoMode()) return sortRows(store.creators);
  return prisma.creator.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getAdminCreator(id: string): Promise<AdminCreatorRow | null> {
  if (isDemoMode()) return store.creators.find((row) => row.id === id) ?? null;
  return prisma.creator.findUnique({ where: { id } });
}

export async function getAdminBrands(): Promise<AdminBrandRow[]> {
  if (isDemoMode()) return sortRows(store.brands);
  return prisma.brand.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getAdminBrand(id: string): Promise<AdminBrandRow | null> {
  if (isDemoMode()) return store.brands.find((row) => row.id === id) ?? null;
  return prisma.brand.findUnique({ where: { id } });
}

export async function getAdminServices(): Promise<AdminServiceRow[]> {
  if (isDemoMode()) return sortRows(store.services);
  return prisma.serviceTier.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getAdminService(id: string): Promise<AdminServiceRow | null> {
  if (isDemoMode()) return store.services.find((row) => row.id === id) ?? null;
  return prisma.serviceTier.findUnique({ where: { id } });
}

export async function getAdminInquiries(): Promise<AdminInquiryRow[]> {
  if (isDemoMode()) {
    return [...store.inquiries].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  if (isDemoMode()) {
    return [...store.users].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminAudit(take = 100): Promise<AdminAuditRow[]> {
  if (isDemoMode()) return store.audit.slice(0, take);
  return prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take });
}
