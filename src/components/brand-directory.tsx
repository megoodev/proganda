"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/data";
import { useState } from "react";

export function BrandDirectory({
  labels,
}: {
  labels: { all: string; caseStudy: string; views: string; roi: string };
}) {
  const [industry, setIndustry] = useState("All");
  const industries = ["All", ...new Set(brands.map((brand) => brand.industry))];
  const visible = brands.filter(
    (brand) => industry === "All" || brand.industry === industry,
  );

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto border-y border-white/10 py-4">
        {industries.map((item) => (
          <button
            key={item}
            onClick={() => setIndustry(item)}
            className={`whitespace-nowrap px-4 py-2 text-xs font-bold ${industry === item ? "bg-white text-black" : "text-white/45 hover:text-white"}`}
          >
            {item === "All" ? labels.all : item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {visible.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group flex min-h-80 flex-col justify-between border border-white/10 bg-[#171717] p-6 transition hover:-translate-y-1 hover:border-white/35"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <span
                  className="text-3xl font-black tracking-[-0.08em]"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </span>
                <ArrowUpRight className="size-5 text-white/35 transition group-hover:text-white" />
              </div>
              <p className="mt-16 text-xs uppercase tracking-widest text-white/45">
                {brand.industry}
              </p>
              <h2 className="mt-3 text-2xl font-black">{brand.campaign}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {brand.description}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  {labels.views}
                </p>
                <p className="mt-1 font-bold">{brand.views}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  {labels.roi}
                </p>
                <p className="mt-1 font-bold" style={{ color: brand.color }}>
                  {brand.roi}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
