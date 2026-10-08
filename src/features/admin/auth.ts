import "server-only";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { lower } from "@/lib/enum";
import type { AdminRole } from "./roles";

export type SessionUser = { userId: string; role: string; email?: string };
export type Actor = { id: string; userId: string; name: string; role: AdminRole };

async function getCallbackUrl(): Promise<string> {
  const headerList = await headers();
  const fullPath = headerList.get("x-url") || headerList.get("referer") || "";
  try {
    const url = new URL(fullPath, "http://localhost");
    return url.pathname + url.search;
  } catch {
    return "/";
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await verifySession();
  if (!session) return null;
  return {
    userId: session.id, // تم تصحيحها من session.userId إلى session.id
    role: session.role,
    email: session.email,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const currentPath = await getCallbackUrl();
    redirect(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
  }
  return user;
}

export async function getActor(): Promise<Actor | null> {
  const user = await getSessionUser();
  console.log("[getActor] session user:", user);
  if (!user || user.role !== "ADMIN") return null;

  // 1. البحث باستخدام userId الخاص بالمستخدم
  let staff = await prisma.staffProfile.findFirst({
    where: { userId: user.userId },
  });

  // 2. إذا لم نجد حساب Staff مرتبط، نبحث عن طريق البريد الإلكتروني (في حالة وجود دعوة معلقة)
  if (!staff) {
    const email =
      user.email ??
      (
        await prisma.user.findFirst({
          where: { id: user.userId },
          select: { email: true },
        })
      )?.email;
    console.log("[getActor] email used for linking:", email);

    if (email) {
      const invited = await prisma.staffProfile.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
      });
      console.log("[getActor] invited staff:", invited);

      if (invited && !invited.userId) {
        await prisma.staffProfile.updateMany({
          where: { id: invited.id, userId: null },
          data: { userId: user.userId },
        });
        staff = await prisma.staffProfile.findFirst({
          where: { id: invited.id },
        });
      } else if (invited && invited.userId === user.userId) {
        staff = invited;
      }
    }
  }

  // 3. الحل الثاني: إذا لم يوجد أي StaffProfile إطلاقاً، قم بإنشائه تلقائياً للأدمن
  if (!staff) {
    const dbUser = user.email
      ? null
      : await prisma.user.findUnique({
          where: { id: user.userId },
          select: { name: true, email: true },
        });

    const userEmail = user.email || dbUser?.email || `admin-${user.userId}@domain.local`;
    const userName = dbUser?.name || "Admin User";

    staff = await prisma.staffProfile.create({
      data: {
        userId: user.userId,
        email: userEmail,
        name: userName,
        adminRole: "SUPER_ADMIN", // تأكد من مطابقة هذه القيمة مع enum الخاص بـ Prisma لديك (مثل ADMIN أو SUPER_ADMIN)
        active: true,
      },
    });
    console.log("[getActor] Auto-created new staffProfile:", staff);
  }

  console.log("[getActor] final staff:", staff);
  if (!staff || !staff.active) return null;

  return {
    id: staff.id,
    userId: user.userId,
    name: staff.name,
    role: lower(staff.adminRole),
  };
}

export async function requireActor(roles: readonly AdminRole[]): Promise<Actor> {
  const actor = await getActor();
  if (!actor) {
    const currentPath = await getCallbackUrl();
    redirect(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
  }
  if (!roles.includes(actor.role)) {
    redirect("/");
  }
  return actor;
}