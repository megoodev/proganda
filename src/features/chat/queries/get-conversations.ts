import { mockConversations } from "../mock-conversations";

// Phase A: mock. Phase C: oRPC procedures (listConversations, listMessages, sendMessage)
// consumed with TanStack Query (refetchInterval polling), checking the contracted status in the DAL.
export async function getConversations() {
  return mockConversations;
}
