import "server-only";
import type { Tx } from "@/lib/prisma-types";

/** A conversation exists for every CONTRACTED blogger. Safe to call repeatedly. */
export async function ensureConversation(tx: Tx, bloggerId: string) {
  return tx.conversation.upsert({ where: { bloggerId }, create: { bloggerId }, update: {} });
}
