"use client";

import type { ReactNode } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AdminContainer({ children }: { children: ReactNode }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn(
        "mx-auto space-y-6 transition-all duration-300 ease-in-out",
        isCollapsed ? "max-w-screen-2xl" : "max-w-7xl"
      )}
    >
      {children}
    </div>
  );
}