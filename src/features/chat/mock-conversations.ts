import type { Conversation } from "./schemas";

// One conversation per CONTRACTED blogger only.
export const mockConversations: Conversation[] = [
  {
    id: "cv1", bloggerName: "يوسف الشناوي", managerName: "سارة عادل", unread: 2,
    messages: [
      { id: "m1", from: "admin", text: "أهلًا يوسف، عندنا حملة جديدة لسياحة الشتاء. هل تناسبك؟", sentAt: "2026-10-02T11:00:00+03:00" },
      { id: "m2", from: "blogger", text: "أكيد، ممكن أعرف الموعد والمطلوب؟", sentAt: "2026-10-02T11:12:00+03:00" },
      { id: "m3", from: "blogger", text: "ولو في بريف مكتوب ابعتهولي", sentAt: "2026-10-02T11:13:00+03:00" },
    ],
  },
  {
    id: "cv2", bloggerName: "مريم عصام", managerName: "سارة عادل", unread: 0,
    messages: [{ id: "m4", from: "admin", text: "تم اعتماد المحتوى. شكرًا على التسليم في الموعد.", sentAt: "2026-10-01T16:30:00+03:00" }],
  },
  {
    id: "cv3", bloggerName: "كريم رضا", managerName: "سارة عادل", unread: 1,
    messages: [{ id: "m5", from: "blogger", text: "هل وصل التحويل الأخير؟", sentAt: "2026-09-30T09:45:00+03:00" }],
  },
];
