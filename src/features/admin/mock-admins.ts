import type { AdminUser } from "./schemas";

export type { AdminUser };

export const mockAdmins: AdminUser[] = [
  { id: "a1", name: "منى سامي", email: "mona@example.com", role: "super_admin", active: true },
  { id: "a2", name: "أحمد فاروق", email: "ahmed@example.com", role: "campaign_manager", active: true },
  { id: "a3", name: "سارة عادل", email: "sara@example.com", role: "creator_manager", active: true },
  { id: "a4", name: "كريم ناصر", email: "karim@example.com", role: "hr", active: true },
  { id: "a5", name: "هدى مصطفى", email: "hoda@example.com", role: "ads_manager", active: false },
];
