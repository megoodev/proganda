"use client";

import { ArrowUpRight, TrendingUp, Eye } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/data";
import { useState } from "react";

export function BrandDirectory({
  labels,
  translatedBrands,
}: {
  labels: { all: string; caseStudy: string; views: string; roi: string };
  translatedBrands?: typeof brands;
}) {
  const [industry, setIndustry] = useState("All");
  
  const displayBrands = translatedBrands || brands;
  const industries = ["All", ...new Set(displayBrands.map((brand) => brand.industry))];
  const visible = displayBrands.filter(
    (brand) => industry === "All" || brand.industry === industry,
  );

  return (
    <div>
      <div className="mb-10 flex gap-2 overflow-x-auto border-y border-border py-4">
        {industries.map((item) => (
          <button
            key={item}
            onClick={() => setIndustry(item)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              industry === item
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item === "All" ? labels.all : item}
          </button>
        ))}
      </div>
      <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className="text-4xl font-black tracking-[-0.08em]"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
              <span className="flex size-9 translate-y-1 items-center justify-center rounded-full bg-muted text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:opacity-100">
                <ArrowUpRight className="size-4 rtl:rotate-90" />
              </span>
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {brand.industry}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-card-foreground">
              {brand.campaign}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {brand.description}
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
              <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <Eye className="size-3 shrink-0" />
                  {labels.views}
                </p>
                <p className="mt-1 text-lg font-black text-card-foreground">
                  {brand.views}
                </p>
              </div>
              <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <TrendingUp className="size-3 shrink-0" />
                  {labels.roi}
                </p>
                <p className="mt-1 text-lg font-black" style={{ color: brand.color }}>
                  {brand.roi}
                </p>
              </div>
            </div>
            <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-xs font-bold uppercase tracking-widest text-card-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              {labels.caseStudy}
              <ArrowUpRight className="size-4 rtl:rotate-90" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
