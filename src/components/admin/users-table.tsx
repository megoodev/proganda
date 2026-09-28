"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  setUserBannedAction,
  setUserRoleAction,
  type CmsActionState,
} from "@/app/cms-actions";
import { Button } from "@/components/ui/button";
import { STAFF_ROLES } from "@/lib/roles";
import { cn } from "@/lib/utils";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  isSelf: boolean;
  createdAtLabel: string;
};

const ROLE_OPTIONS = ["brand", "blogger", "creator", ...STAFF_ROLES] as const;

export function UsersTable({ rows }: { rows: UserRow[] }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  function run(perform: () => Promise<CmsActionState>, success: string) {
    setMessage(null);
    startTransition(async () => {
      const result = await perform();
      if (result.status !== "success") {
        setIsError(true);
        setMessage(result.message ?? "Action failed.");
        return;
      }
      setIsError(false);
      setMessage(success);
      router.refresh();
    });
  }

  return (
    <div>
      {message ? (
        <p
          className={cn(
            "mb-4 text-sm",
            isError ? "text-red-400" : "text-emerald-400",
          )}
        >
          {message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/45">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-t border-white/10",
                  pending && "opacity-60",
                  row.banned && "text-white/40",
                )}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-xs text-white/45">{row.email}</p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={row.role}
                    disabled={pending || row.isSelf}
                    onChange={(event) =>
                      run(
                        () => setUserRoleAction(row.id, event.target.value),
                        "Role updated.",
                      )
                    }
                    className="h-8 rounded-md border border-white/10 bg-transparent px-2 text-xs disabled:opacity-50"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-white/50">{row.createdAtLabel}</td>
                <td className="px-4 py-3">
                  {row.banned ? (
                    <span className="text-red-400">Banned</span>
                  ) : (
                    <span className="text-emerald-400">Active</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {row.isSelf ? (
                    <span className="text-xs uppercase tracking-widest text-white/30">
                      You
                    </span>
                  ) : row.banned ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={pending}
                      onClick={() =>
                        run(
                          () => setUserBannedAction(row.id, false),
                          "User restored.",
                        )
                      }
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={pending}
                      onClick={() =>
                        run(
                          () => setUserBannedAction(row.id, true),
                          "User banned.",
                        )
                      }
                    >
                      Ban
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
