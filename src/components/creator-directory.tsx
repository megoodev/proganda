"use client";

import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { creators } from "@/lib/data";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((creator) => (
          <Card
            key={creator.id}
            className="group overflow-hidden rounded-xl transition-colors hover:border-primary/50"
          >
            {/* Card Header with Image Overlay */}
            <CardHeader className="p-0">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <Badge
                    variant="outline"
                    className="border-none p-0 text-xs font-bold uppercase tracking-widest"
                    style={{ color: creator.accent }}
                  >
                    {creator.niche}
                  </Badge>
                  <h2 className="text-2xl font-black text-white leading-tight">
                    {creator.name}
                  </h2>
                  <p className="text-sm text-white/70">{creator.handle}</p>
                </div>
              </div>
            </CardHeader>

            {/* Metrics Content Section */}
            <CardContent className="p-0">
              <div className="grid grid-cols-2 border-t">
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {labels.reach}
                  </p>
                  <p className="mt-1 font-bold text-foreground">
                    {creator.reach}
                  </p>
                </div>
                <div className="border-s p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {labels.engagement}
                  </p>
                  <p className="mt-1 font-bold text-foreground">
                    {creator.engagement}
                  </p>
                </div>
              </div>
            </CardContent>

            <Separator />

            {/* Footer Navigation Button */}
            <CardFooter className="p-0">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-between rounded-none p-4 text-xs font-bold text-primary hover:bg-accent/50"
              >
                <Link href={`/creators/${creator.id}`}>
                  <span>{labels.profile}</span>
                  <ArrowUpRight className="size-4 rtl:rotate-90" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}