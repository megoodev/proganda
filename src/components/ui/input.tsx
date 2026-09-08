import * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants =
  "flex h-11 w-full border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 disabled:cursor-not-allowed disabled:opacity-50";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input type={type} className={cn(inputVariants, className)} {...props} />
  );
}

export { Input, inputVariants };
