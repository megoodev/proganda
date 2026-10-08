import type { prisma } from "@/lib/prisma";

// Type of the client passed to `prisma.$transaction(async (tx) => ...)`
export type Tx = Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;
