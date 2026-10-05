import type { AdminRequest } from "./schemas";

export const mockRequests: AdminRequest[] = [
  { id: "r1", type: "campaign", from: "Zad Trips", subject: "حملة موسم الشتاء على تيك توك", status: "new", assignedTo: null, createdAt: "2026-10-03T09:10:00+03:00" },
  { id: "r2", type: "consultation", from: "نور للمجوهرات", subject: "استشارة عن إطلاق منتج جديد", status: "in_review", assignedTo: "a2", createdAt: "2026-10-02T15:30:00+03:00" },
  { id: "r3", type: "job", from: "محمود إبراهيم", subject: "تقديم: Video Editor", status: "new", assignedTo: "a4", createdAt: "2026-10-02T11:00:00+03:00" },
  { id: "r4", type: "ad", from: "Bite Burgers", subject: "إعلان مدفوع في قسم العروض", status: "in_progress", assignedTo: "a5", createdAt: "2026-10-01T18:45:00+03:00" },
  { id: "r5", type: "campaign", from: "فيوجن للإلكترونيات", subject: "تغطية معرض تقني", status: "done", assignedTo: "a2", createdAt: "2026-09-29T10:20:00+03:00" },
  { id: "r6", type: "job", from: "ليلى حسن", subject: "تقديم: Content Strategist", status: "in_review", assignedTo: "a4", createdAt: "2026-09-28T13:05:00+03:00" },
  { id: "r7", type: "consultation", from: "ستوديو ميلا", subject: "استشارة عن إدارة حسابات بلوجرز", status: "rejected", assignedTo: "a2", createdAt: "2026-09-27T09:00:00+03:00" },
  { id: "r8", type: "ad", from: "كافيه ريزا", subject: "إعلان عن افتتاح فرع جديد", status: "new", assignedTo: null, createdAt: "2026-09-26T16:40:00+03:00" },
];
