import { lower } from "@/lib/enum";
import type { AdminUser } from "./schemas";

type StaffRow = { id: string; name: string; email: string; adminRole: Parameters<typeof lower>[0]; active: boolean };

export const toAdminUser = (row: StaffRow): AdminUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: lower(row.adminRole) as AdminUser["role"],
  active: row.active,
});
