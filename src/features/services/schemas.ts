import { z } from "zod";
import { idSchema } from "@/lib/validators";

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  published: z.boolean(),
});

export const serviceUpdateSchema = serviceSchema.extend({ id: z.string().min(1) });
export const serviceIdSchema = idSchema;

export type ServiceInput = z.infer<typeof serviceSchema>;
export type Service = ServiceInput & { id: string };
