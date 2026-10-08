import { z } from "zod";

// Egyptian mobile: 01x xxxxxxxx, optionally with +20 / 0020
export const egyptPhone = /^(\+20|0020|0)?1[0125]\d{8}$/;

export const optionalPhone = z.string().regex(egyptPhone, "Enter a valid Egyptian mobile number").or(z.literal("")).optional();
export const optionalUrl = z.string().url().or(z.literal("")).optional();
export const idSchema = z.object({ id: z.string().min(1) });
