import type { AdminRole } from "@/features/admin/roles";
import { requestTypes, type RequestType } from "./schemas";

// Which request types each admin role can see in the shared inbox.
export const typesForRole: Record<AdminRole, readonly RequestType[]> = {
  super_admin: requestTypes,
  campaign_manager: ["consultation", "campaign"],
  creator_manager: [],
  hr: ["job"],
  ads_manager: ["ad"],
};
