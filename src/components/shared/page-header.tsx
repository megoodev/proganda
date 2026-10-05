import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: Props) {
  return (
    <div className="group relative mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/75 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-border/80 dark:bg-card/60">
      <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5 shrink-0 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>

          <h1 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground sm:text-2xl">
            {title}
          </h1>
        </div>

        {description && (
          <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground/90 leading-relaxed ps-5">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-2 shrink-0 transition-transform duration-200 hover:scale-[1.01]">
          {action}
        </div>
      )}
    </div>
  );
}