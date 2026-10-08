import type { ContractReviewStatus } from "./schemas";

export function contractTone(status: ContractReviewStatus): "default" | "success" | "warning" | "destructive" {
  switch (status) {
    case "PENDING":
      return "warning";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "destructive";
    default:
      return "default";
  }
}
