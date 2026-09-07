"use client";

import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { creators } from "@/lib/data";

export function CreatorDirectory({
  labels,
}: {
  labels: {
    search: string;
    all: string;
    profile: string;
    reach: string;
    engagement: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState("All");
  const niches = ["All", ...new Set(creators.map((creator) => creator.niche))];
  const visible = creators.filter(
    (creator) =>
      `${creator.name} ${creator.handle} ${creator.niche}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (niche === "All" || creator.niche === niche),
  );
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {niches.map((item) => (
            <button
              key={item}
              onClick={() => setNiche(item)}
              className={`whitespace-nowrap px-4 py-2 text-xs font-bold ${niche === item ? "bg-white text-black" : "text-white/45 hover:text-white"}`}
            >
              {item === "All" ? labels.all : item}
            </button>
          ))}
        </div>
        <label className="relative">
          <Search className="absolute left-3 top-2.5 size-3.5 text-white/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            className="h-9 w-full border-b border-white/20 bg-transparent pl-8 text-xs outline-none focus:border-[#ccff00] sm:w-64"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((creator) => (
          <article
            key={creator.id}
            className="group overflow-hidden border border-white/10 bg-[#171717]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={creator.image}
                alt={creator.name}
                className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: creator.accent }}
                >
                  {creator.niche}
                </p>
                <h2 className="mt-2 text-2xl font-black">{creator.name}</h2>
                <p className="text-sm text-white/50">{creator.handle}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-white/10">
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  {labels.reach}
                </p>
                <p className="mt-1 font-bold">{creator.reach}</p>
              </div>
              <div className="border-s border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  {labels.engagement}
                </p>
                <p className="mt-1 font-bold">{creator.engagement}</p>
              </div>
            </div>
            <Link
              href={`/creators/${creator.id}`}
              className="flex items-center justify-between p-4 text-xs font-bold text-[#ccff00]"
            >
              {labels.profile}
              <ArrowUpRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
