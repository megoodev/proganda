import "server-only";
import { prisma } from "@/lib/prisma";
import { requireActor } from "@/features/admin/auth";
import { can } from "@/features/admin/permissions";
import { toBlogger } from "../mappers";

export async function listBloggers() {
  await requireActor(can.bloggers);
  return (await prisma.bloggerProfile.findMany({ orderBy: { createdAt: "desc" } })).map(toBlogger);
}
