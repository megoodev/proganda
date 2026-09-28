"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function ConfirmDeleteButton({
  label,
  action,
  id,
}: {
  label: string;
  action: (id: string) => Promise<{ status: string; message?: string }>;
  id: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("This cannot be undone. Continue?")) return;
        startTransition(async () => {
          await action(id);
        });
      }}
    >
      {pending ? "Deleting..." : label}
    </Button>
  );
}
