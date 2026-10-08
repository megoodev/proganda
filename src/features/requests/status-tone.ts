import type { RequestStatus } from "./schemas";

export function statusTone(status: RequestStatus): "default" | "success" | "warning" | "destructive" {
  switch (status) {
    case "NEW":
      return "default";
    case "IN_REVIEW":
      return "warning";
    case "IN_PROGRESS":
      return "default";
    case "DONE":
      return "success";
    case "REJECTED":
      return "destructive";
    default:
      return "default";
  }
}
