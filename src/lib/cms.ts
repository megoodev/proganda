import { prisma } from "@/lib/prisma";
import { isDemoMode, getAdminBrands, getAdminCreators, getAdminServices } from "@/lib/admin-data";
import {
  brands as fallbackBrands,
  creators as fallbackCreators,
  serviceTiers as fallbackTiers,
  type Brand,
  type Creator,
  type ServiceTier,
} from "@/lib/data";

function mapCreator(row: {
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
}): Creator {
  return {
    id: row.slug,
    name: row.name,
    handle: row.handle,
    niche: row.niche as Creator["niche"],
    platforms: row.platforms as Creator["platforms"],
    reach: row.reach,
    engagement: row.engagement,
    location: row.location,
    image: row.image,
    accent: row.accent,
  };
}

function mapBrand(row: {
  slug: string;
  name: string;
  industry: string;
  campaign: string;
  description: string;
  services: string[];
  views: string;
  roi: string;
  color: string;
}): Brand {
  return {
    slug: row.slug,
    name: row.name,
    industry: row.industry,
    campaign: row.campaign,
    description: row.description,
    services: row.services,
    views: row.views,
    roi: row.roi,
    color: row.color,
  };
}

function mapTier(row: {
  id: string;
  name: string;
  eyebrow: string;
  scope: string;
  offer: string;
  features: string[];
  savingsRate: number;
  accent: string;
}): ServiceTier {
  return {
    id: row.id as ServiceTier["id"],
    name: row.name,
    eyebrow: row.eyebrow,
    scope: row.scope,
    offer: row.offer,
    features: row.features,
    savingsRate: row.savingsRate,
    accent: row.accent as ServiceTier["accent"],
  };
}

export async function getPublishedCreators(): Promise<Creator[]> {
  if (isDemoMode()) {
    const rows = await getAdminCreators();
    const published = rows.filter((row) => row.published).map(mapCreator);
    return published.length ? published : fallbackCreators;
  }
  try {
    const rows = await prisma.creator.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    return rows.length ? rows.map(mapCreator) : fallbackCreators;
  } catch {
    return fallbackCreators;
  }
}

export async function getPublishedCreator(slug: string): Promise<Creator | null> {
  if (isDemoMode()) {
    const rows = await getAdminCreators();
    const row = rows.find((item) => item.slug === slug && item.published);
    if (row) return mapCreator(row);
    return fallbackCreators.find((item) => item.id === slug) ?? null;
  }
  try {
    const row = await prisma.creator.findFirst({
      where: { slug, published: true },
    });
    if (row) return mapCreator(row);
  } catch {
    /* fall through */
  }
  return fallbackCreators.find((item) => item.id === slug) ?? null;
}

export async function getPublishedBrands(): Promise<Brand[]> {
  if (isDemoMode()) {
    const rows = await getAdminBrands();
    const published = rows.filter((row) => row.published).map(mapBrand);
    return published.length ? published : fallbackBrands;
  }
  try {
    const rows = await prisma.brand.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    return rows.length ? rows.map(mapBrand) : fallbackBrands;
  } catch {
    return fallbackBrands;
  }
}

export async function getPublishedBrand(slug: string): Promise<Brand | null> {
  if (isDemoMode()) {
    const rows = await getAdminBrands();
    const row = rows.find((item) => item.slug === slug && item.published);
    if (row) return mapBrand(row);
    return fallbackBrands.find((item) => item.slug === slug) ?? null;
  }
  try {
    const row = await prisma.brand.findFirst({
      where: { slug, published: true },
    });
    if (row) return mapBrand(row);
  } catch {
    /* fall through */
  }
  return fallbackBrands.find((item) => item.slug === slug) ?? null;
}

export async function getPublishedServiceTiers(): Promise<ServiceTier[]> {
  if (isDemoMode()) {
    const rows = await getAdminServices();
    const published = rows.filter((row) => row.published).map(mapTier);
    return published.length ? published : fallbackTiers;
  }
  try {
    const rows = await prisma.serviceTier.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    return rows.length ? rows.map(mapTier) : fallbackTiers;
  } catch {
    return fallbackTiers;
  }
}
