import type { SiteSettings, SocialLink } from "./schemas";

type Row = {
  id: string;
  siteName: string;
  email: string;
  whatsapp: string;
  phone?: string | null;
  address?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  socialLinks: Array<{
    id: string;
    platform: string;
    title?: string | null;
    url: string;
    icon?: string | null;
    sortOrder: number;
  }>;
  updatedAt: Date;
};

export const toSiteSettings = (row: Row): SiteSettings => ({
  siteName: row.siteName,
  whatsapp: row.whatsapp,
  email: row.email,
  phone: row.phone ?? undefined,
  address: row.address ?? undefined,
  instagram: row.instagram ?? "",
  tiktok: row.tiktok ?? "",
  youtube: row.youtube ?? "",
  facebook: row.facebook ?? "",
  socialLinks: row.socialLinks.map((link): SocialLink => ({
    id: link.id,
    platform: link.platform,
    title: link.title ?? "",
    url: link.url,
    icon: link.icon ?? undefined,
    sortOrder: link.sortOrder,
  })),
});
