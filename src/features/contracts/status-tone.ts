import type { Tone } from "@/components/shared/status-badge";
import type { ContractStatus } from "./schemas";

export const contractTone: Record<ContractStatus, Tone> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};
