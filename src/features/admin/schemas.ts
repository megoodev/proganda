import { z } from "zod";
import { idSchema } from "@/lib/validators";
import { adminRoles } from "./roles";

export const adminFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(adminRoles),
});

export const adminUpdateSchema = adminFormSchema.extend({ id: z.string().min(1) });
export const setAdminRoleSchema = idSchema.extend({ role: z.enum(adminRoles) });
export const setAdminActiveSchema = idSchema.extend({ active: z.boolean() });

export type AdminFormInput = z.infer<typeof adminFormSchema>;
export type AdminUser = AdminFormInput & { id: string; active: boolean };
