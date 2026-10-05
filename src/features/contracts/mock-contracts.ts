import type { ContractRequest } from "./schemas";

export const mockContracts: ContractRequest[] = [
  { id: "ct1", party: "عمر خالد", partyType: "blogger", status: "pending", notes: "", createdAt: "2026-10-02T12:00:00+03:00" },
  { id: "ct2", party: "هنا طارق", partyType: "blogger", status: "pending", notes: "بانتظار مراجعة الأرقام", createdAt: "2026-10-01T10:30:00+03:00" },
  { id: "ct3", party: "نور للمجوهرات", partyType: "brand", status: "pending", notes: "", createdAt: "2026-09-30T14:15:00+03:00" },
  { id: "ct4", party: "Zad Trips", partyType: "brand", status: "approved", notes: "عقد سنوي", createdAt: "2026-09-12T09:00:00+03:00" },
  { id: "ct5", party: "ليلى حسن", partyType: "blogger", status: "rejected", notes: "المحتوى لا يناسب نيش الشركة", createdAt: "2026-09-05T16:20:00+03:00" },
];
