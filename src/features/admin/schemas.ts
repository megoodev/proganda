import { z } from "zod";
import { adminRoles } from "./roles";

export const adminFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(adminRoles),
});

export type AdminFormInput = z.infer<typeof adminFormSchema>;
export type AdminUser = AdminFormInput & { id: string; active: boolean };
