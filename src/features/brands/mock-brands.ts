import type { Brand } from "./schemas";

export const mockBrands: Brand[] = [
  { id: "br1", name: "Zad Trips", industry: "سياحة", contactName: "إيمان حسني", contactPhone: "+201001234567", status: "contracted" },
  { id: "br2", name: "Bite Burgers", industry: "مطاعم", contactName: "طارق منصور", contactPhone: "+201112345678", status: "contracted" },
  { id: "br3", name: "نور للمجوهرات", industry: "مجوهرات", contactName: "رانيا سعيد", contactPhone: "+201223456789", status: "pending" },
  { id: "br4", name: "فيوجن للإلكترونيات", industry: "تقنية", contactName: "ماجد فؤاد", contactPhone: "+201554567890", status: "pending" },
];
