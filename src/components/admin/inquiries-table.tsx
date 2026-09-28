"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { updateInquiryStatusAction, type CmsActionState } from "@/app/cms-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type InquiryRow = {
  id: string;
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  status: string;
  createdAtLabel: string;
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#3AA7FD]/15 text-[#3AA7FD]",
  read: "bg-white/10 text-white/70",
  archived: "bg-white/5 text-white/40",
};

const NEXT_ACTIONS: Record<string, { label: string; status: "read" | "archived" | "new" }[]> = {
  new: [
    { label: "Mark read", status: "read" },
    { label: "Archive", status: "archived" },
  ],
  read: [
    { label: "Archive", status: "archived" },
    { label: "Back to new", status: "new" },
  ],
  archived: [{ label: "Restore", status: "read" }],
};

export function InquiriesTable({ rows }: { rows: InquiryRow[] }) {
  const [filter, setFilter] = useState<"all" | "new" | "read" | "archived">("all");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const visible = rows.filter((row) => filter === "all" || row.status === filter);

  function updateStatus(id: string, status: "new" | "read" | "archived") {
    setError(null);
    startTransition(async () => {
      const result: CmsActionState = await updateInquiryStatusAction(id, status);
      if (result.status === "error") {
        setError(result.message ?? "Could not update inquiry.");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "new", "read", "archived"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition",
              filter === value
                ? "bg-[#3AA7FD] text-black"
                : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white",
            )}
          >
            {value}
            {value !== "all" ? (
              <span className="ml-1.5 font-medium opacity-70">
                {rows.filter((row) => row.status === value).length}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">No inquiries in this view.</p>
      ) : (
        <div className="mt-6 grid gap-3">
          {visible.map((row) => (
            <div
              key={row.id}
              className={cn(
                "rounded-lg border border-white/10 bg-[#141416] p-4 transition",
                pending && "opacity-60",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{row.name}</p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                        STATUS_STYLES[row.status] ?? STATUS_STYLES.read,
                      )}
                    >
                      {row.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/45">
                    {row.email} · {row.company} · {row.createdAtLabel}
                  </p>
                </div>
                <div className="flex gap-2">
                  {NEXT_ACTIONS[row.status]?.map((action) => (
                    <Button
                      key={action.status}
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={pending}
                      onClick={() => updateStatus(row.id, action.status)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
                {row.interest}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-white/70">
                {row.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
