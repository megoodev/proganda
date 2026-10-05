import "server-only";

import { prisma } from "@/lib/prisma";
import type { AdPlacement } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";
import type { Brand, Creator, ServiceTier } from "@/lib/data";

export type PublicAdDTO = {
  slug: string;
  title: string;
  summary: string | null;
  content: Prisma.JsonValue;
  placement: AdPlacement;
  publishedAt: Date | null;
};

export async function getPublishedCreators(): Promise<Creator[]> {
  const rows = await prisma.creator.findMany({
    where: { published: true },
    select: {
      slug: true,
      name: true,
      handle: true,
      niche: true,
      platforms: true,
      reach: true,
      engagement: true,
      location: true,
      image: true,
      accent: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map((row) => ({
    ...row,
    id: row.slug,
    niche: row.niche as Creator["niche"],
    platforms: row.platforms as Creator["platforms"],
  }));
}

export async function getPublishedCreator(
  slug: string,
): Promise<Creator | null> {
  const row = await prisma.creator.findFirst({
    where: { slug, published: true },
    select: {
      slug: true,
      name: true,
      handle: true,
      niche: true,
      platforms: true,
      reach: true,
      engagement: true,
      location: true,
      image: true,
      accent: true,
    },
  });
  return row
    ? {
        ...row,
        id: row.slug,
        niche: row.niche as Creator["niche"],
        platforms: row.platforms as Creator["platforms"],
      }
    : null;
}

export async function getPublishedBrands(): Promise<Brand[]> {
  return prisma.brand.findMany({
    where: { published: true },
    select: {
      slug: true,
      name: true,
      industry: true,
      campaign: true,
      description: true,
      services: true,
      views: true,
      roi: true,
      color: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getPublishedBrand(slug: string): Promise<Brand | null> {
  return prisma.brand.findFirst({
    where: { slug, published: true },
    select: {
      slug: true,
      name: true,
      industry: true,
      campaign: true,
      description: true,
      services: true,
      views: true,
      roi: true,
      color: true,
    },
  });
}

export async function getPublishedServiceTiers(): Promise<ServiceTier[]> {
  const rows = await prisma.serviceTier.findMany({
    where: { published: true },
    select: {
      id: true,
      name: true,
      eyebrow: true,
      scope: true,
      offer: true,
      features: true,
      savingsRate: true,
      accent: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map((row) => ({
    ...row,
    id: row.id as ServiceTier["id"],
    accent: row.accent as ServiceTier["accent"],
  }));
}

export async function listPublishedAds(
  placement?: AdPlacement,
  now = new Date(),
): Promise<PublicAdDTO[]> {
  return prisma.ad.findMany({
    where: {
      status: "PUBLISHED",
      ...(placement ? { placement } : {}),
      OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
      AND: [{ OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] }],
    },
    select: {
      slug: true,
      title: true,
      summary: true,
      content: true,
      placement: true,
      publishedAt: true,
    },
    orderBy: [{ publishedAt: "desc" }, { title: "asc" }],
  });
}

export async function listPublishedJobOpenings() {
  return prisma.jobOpening.findMany({
    where: { status: "PUBLISHED" },
    select: {
      slug: true,
      title: true,
      department: true,
      location: true,
      employmentType: true,
      description: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function listPublishedServices() {
  return prisma.service.findMany({
    where: { status: "PUBLISHED" },
    select: {
      slug: true,
      title: true,
      summary: true,
      details: true,
      priceLabel: true,
    },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
}
