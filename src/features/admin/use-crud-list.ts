import { useState } from "react";

// Local CRUD state for phase A. Phase C: each function becomes a Server Action (+ audit log entry).
export function useCrudList<T extends { id: string }>(initial: T[]) {
  const [rows, setRows] = useState(initial);
  const [editing, setEditing] = useState<T | "new" | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);

  const save = (item: T) => {
    setRows((prev) => (prev.some((row) => row.id === item.id) ? prev.map((row) => (row.id === item.id ? item : row)) : [item, ...prev]));
    setEditing(null);
  };

  const confirmDelete = () => {
    if (deleting) setRows((prev) => prev.filter((row) => row.id !== deleting.id));
    setDeleting(null);
  };

  return { rows, setRows, editing, setEditing, deleting, setDeleting, save, confirmDelete };
}
