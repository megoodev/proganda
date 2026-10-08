"use client";

import { useCallback, useState } from "react";

export function useCrudList<T extends { id: string }>(initial: T[]) {
  const [rows, setRows] = useState(initial);
  const [editing, setEditing] = useState<T | "new" | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);

  const save = useCallback((item: T) => {
    setRows((prev) =>
      prev.some((row) => row.id === item.id) ? prev.map((row) => (row.id === item.id ? item : row)) : [item, ...prev],
    );
    setEditing(null);
  }, []);

  const confirmDelete = useCallback(() => {
    setRows((prev) => (deleting ? prev.filter((row) => row.id !== deleting.id) : prev));
    setDeleting(null);
  }, [deleting]);

  return { rows, setRows, editing, setEditing, deleting, setDeleting, save, confirmDelete };
}
