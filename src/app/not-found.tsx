import { ArrowRight, Compass, Users } from "lucide-react";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden px-5 py-24 lg:px-8">
      <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          <Compass className="size-3.5" />
          خطأ 404 / Error 404
        </p>

        <h1 className="text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tight text-primary/15 select-none">
          404
        </h1>

        <h2 className="-mt-4 text-3xl font-black tracking-tight text-accent-foreground sm:text-4xl">
          هذه الصفحة خرجت عن الموجز / This page went off-brief.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          قد يكون الرابط معطلاً أو أن الصفحة انتقلت. The link may be broken or
          the page may have moved.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
          >
            الرئيسية / Home
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            <Users className="size-4" />
            صناع المحتوى / Creators
          </Link>
        </div>

        <Link
          href="/contact"
          className="mt-7 inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
        >
          تواصل مع الاستوديو / Contact the studio
        </Link>
      </div>
    </div>
  );
}
