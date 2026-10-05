import type { Service } from "./schemas";

export const mockServices: Service[] = [
  { id: "s1", title: "إدارة المحتوى", description: "تخطيط وإنتاج ونشر المحتوى على حسابات البلوجرز.", published: true },
  { id: "s2", title: "حملات الإنفلونسرز", description: "ترشيح البلوجرز المناسبين وتنفيذ الحملة بالكامل.", published: true },
  { id: "s3", title: "الإعلانات المدفوعة", description: "إدارة إعلانات السوشيال ميديا وقياس نتائجها.", published: true },
  { id: "s4", title: "الاستشارات", description: "استشارة مجانية لتحديد أنسب خطة لمشروعك.", published: false },
];
