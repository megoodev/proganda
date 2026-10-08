"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AdminRole } from "./roles";

interface AdminRoleContextValue {
  role: AdminRole | null;
  setRole: (role: AdminRole | null) => void;
}

const AdminRoleContext = createContext<AdminRoleContextValue | undefined>(undefined);

export function AdminRoleProvider({
  children,
  role: initialRole,
}: {
  children: ReactNode;
  role: AdminRole | null;
}) {
  const [role, setRole] = useState<AdminRole | null>(initialRole);

  return <AdminRoleContext.Provider value={{ role, setRole }}>{children}</AdminRoleContext.Provider>;
}

export function useAdminRole() {
  const context = useContext(AdminRoleContext);
  if (context === undefined) {
    throw new Error("useAdminRole must be used within an AdminRoleProvider");
  }
  return context;
}
