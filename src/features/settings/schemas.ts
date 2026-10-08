import { z } from "zod";
import { egyptPhone } from "@/lib/validators";

export const socialLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  icon: z.string().optional(),
  sortOrder: z.number().default(0),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  whatsapp: z.string().regex(egyptPhone, "Enter a valid Egyptian mobile number"),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  instagram: z.string().url().or(z.literal("")).optional(),
  tiktok: z.string().url().or(z.literal("")).optional(),
  youtube: z.string().url().or(z.literal("")).optional(),
  facebook: z.string().url().or(z.literal("")).optional(),
  socialLinks: z.array(socialLinkSchema).default([]),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
