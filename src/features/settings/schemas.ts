import { z } from "zod";

const optionalUrl = z.string().url().or(z.literal(""));

// Egyptian mobile: 01x xxxxxxxx, optionally with +20 / 0020
const egyptPhone = /^(\+20|0020|0)?1[0125]\d{8}$/;





export const socialLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string(),
  title: z.string().optional(), // <-- إرجاع الحقل اختيارياً (string | undefined)
  url: z.string(),
  icon: z.string().optional(),
  sortOrder: z.number().default(0),
});

export const siteSettingsSchema = z.object({
  siteName: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  socialLinks: z.array(socialLinkSchema),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export type SocialLink = z.infer<typeof socialLinkSchema>;
