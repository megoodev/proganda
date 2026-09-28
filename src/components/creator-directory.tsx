"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin, Search, TrendingUp, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { creators } from "@/lib/data";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="space-y-8">
      {/* Search and Filters Control Bar */}
      <div className="flex flex-col gap-4 border-y py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {niches.map((item) => (
            <Button
              key={item}
              variant={niche === item ? "default" : "ghost"}
              size="sm"
              onClick={() => setNiche(item)}
              className="whitespace-nowrap font-bold text-xs"
            >
              {item === "All" ? labels.all : item}
            </Button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>

      {/* Creator Cards Grid */}
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((creator) => (
          <Link
            key={creator.id}
            href={`/creators/${creator.id}`}
            className="group flex flex-col rounded-2xl border bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Portrait */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={creator.image}
                alt={creator.name}
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <span
                className="absolute start-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                style={{ backgroundColor: creator.accent }}
              >
                {creator.niche}
              </span>
              <span className="absolute bottom-3 end-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="size-4 rtl:rotate-90" />
              </span>
            </div>

            {/* Identity */}
            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
              <h2 className="text-lg font-black leading-tight tracking-tight text-card-foreground">
                {creator.name}
              </h2>
              <p className="text-sm text-muted-foreground">{creator.handle}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3 shrink-0" />
                  {creator.location}
                </span>
                {creator.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Campaign metrics */}
              <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    <Users className="size-3 shrink-0" />
                    {labels.reach}
                  </p>
                  <p className="mt-1 text-xl font-black text-card-foreground">
                    {creator.reach}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/60 px-3 py-2.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    <TrendingUp className="size-3 shrink-0" />
                    {labels.engagement}
                  </p>
                  <p
                    className="mt-1 text-xl font-black"
                    style={{ color: creator.accent }}
                  >
                    {creator.engagement}
                  </p>
                </div>
              </div>

              {/* Conversion CTA */}
              <span className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors group-hover:bg-primary/90">
                {labels.profile}
                <ArrowUpRight className="size-4 rtl:rotate-90" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}