import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  published: z.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
export type Service = ServiceInput & { id: string };
