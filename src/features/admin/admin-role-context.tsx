"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AdminRole } from "./roles";

// `initialRole` should come from the real session. The switcher (preview only) can still override it.
const AdminRoleContext = createContext<{ role: AdminRole; setRole: (role: AdminRole) => void } | null>(null);

export function AdminRoleProvider({ children, initialRole = "super_admin" }: { children: ReactNode; initialRole?: AdminRole }) {
  const [role, setRole] = useState<AdminRole>(initialRole);
  return <AdminRoleContext.Provider value={{ role, setRole }}>{children}</AdminRoleContext.Provider>;
}

export function useAdminRole() {
  const ctx = useContext(AdminRoleContext);
  if (!ctx) throw new Error("useAdminRole must be used inside AdminRoleProvider");
  return ctx;
}
