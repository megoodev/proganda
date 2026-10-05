import type { Tone } from "@/components/shared/status-badge";
import type { RequestStatus } from "./schemas";

export const statusTone: Record<RequestStatus, Tone> = {
  new: "info",
  in_review: "warning",
  in_progress: "warning",
  done: "success",
  rejected: "danger",
};
