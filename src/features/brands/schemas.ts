import { z } from "zod";

export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  contactName: z.string(),
  contactPhone: z.string(),
  status: z.enum(["pending", "contracted"]),
});

export type Brand = z.infer<typeof brandSchema>;
export type BrandStatus = Brand["status"];
