import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y border border-white/15 bg-white/5 px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#3AA7FD] focus:ring-2 focus:ring-[#3AA7FD]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
