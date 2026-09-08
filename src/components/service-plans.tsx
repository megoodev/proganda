"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { brandServices, creatorServices, serviceTiers } from "@/lib/data";

type Labels = {
  select: string;
  popular: string;
  calculator: string;
  creators: string;
  estimate: string;
  build: string;
  brandsTab: string;
  creatorsTab: string;
  scopeTitle: string;
  scopeDescription: string;
  consultation: string;
};

export function ServicePlans({
  labels,
  tierCopy,
  brandServiceCopy,
  creatorServiceCopy,
}: {
  labels: Labels;
  tierCopy: Record<
    string,
    { name: string; scope: string; offer: string; features: string[] }
  >;
  brandServiceCopy: string[];
  creatorServiceCopy: string[];
}) {
  const [active, setActive] = useState("tier_2");
  const [count, setCount] = useState(3);
  const [audience, setAudience] = useState<"brand" | "creator">("brand");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const tier =
    serviceTiers.find((item) => item.id === active) ?? serviceTiers[1];
  const copy = tierCopy[active];
  const savings = Math.round(count * 420 * tier.savingsRate);
  const serviceCopy =
    audience === "brand" ? brandServiceCopy : creatorServiceCopy;
  const serviceKeys = audience === "brand" ? brandServices : creatorServices;

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  return (
    <>
      <section className="mb-16 border-y border-white/10 py-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAudience("brand")}
            className={`px-5 py-3 text-sm font-bold ${audience === "brand" ? "bg-[#ccff00] text-black" : "border border-white/15 text-white/55"}`}
          >
            {labels.brandsTab}
          </button>
          <button
            onClick={() => setAudience("creator")}
            className={`px-5 py-3 text-sm font-bold ${audience === "creator" ? "bg-[#ff007f] text-white" : "border border-white/15 text-white/55"}`}
          >
            {labels.creatorsTab}
          </button>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCopy.map((service, index) => (
            <button
              key={serviceKeys[index]}
              onClick={() => toggleService(service)}
              className={`flex min-h-20 items-start gap-3 border p-4 text-start text-sm transition ${selectedServices.includes(service) ? "border-[#ccff00] bg-[#ccff00]/10 text-white" : "border-white/10 text-white/55 hover:border-white/35"}`}
            >
              <span
                className={`mt-0.5 flex size-4 shrink-0 items-center justify-center border text-[10px] ${selectedServices.includes(service) ? "border-[#ccff00] bg-[#ccff00] text-black" : "border-white/25"}`}
              >
                {selectedServices.includes(service) ? "✓" : ""}
              </span>
              {service}
            </button>
          ))}
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-3">
        {serviceTiers.map((item) => {
          const itemCopy = tierCopy[item.id];
          const selected = active === item.id;
          return (
            <article
              key={item.id}
              className={`relative flex flex-col border bg-white/4 p-6 transition sm:p-7 ${selected ? "-translate-y-1" : "border-white/10 hover:border-white/30"}`}
              style={
                selected
                  ? {
                      borderColor:
                        item.accent === "purple" ? "#8a2be2" : "#ccff00",
                      boxShadow: `0 0 34px ${item.accent === "purple" ? "#8a2be2" : "#ccff00"}22`,
                    }
                  : undefined
              }
            >
              {item.id === "tier_2" && (
                <span className="absolute right-5 top-5 rounded-full bg-[#8a2be2] px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  {labels.popular}
                </span>
              )}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                0{item.id.at(-1)} /{" "}
                {item.id === "tier_2" ? "flagship" : "direct access"}
              </p>
              <h2 className="mt-8 text-3xl font-black">{itemCopy.name}</h2>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-white/55">
                {itemCopy.scope}
              </p>
              <p className="mt-6 border-y border-white/10 py-4 text-sm font-bold leading-relaxed text-[#ccff00]">
                {itemCopy.offer}
              </p>
              <ul className="my-7 grid gap-3 text-sm text-white/70">
                {itemCopy.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="size-4 shrink-0 text-[#ccff00]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActive(item.id)}
                className="mt-auto inline-flex items-center justify-between border border-white/20 px-4 py-3 text-sm font-bold transition hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black"
              >
                {labels.select}
                <ArrowRight className="size-4" />
              </button>
            </article>
          );
        })}
      </div>
      <section className="mt-16 grid gap-8 border border-white/10 bg-black/20 p-6 sm:p-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
            {labels.calculator}
          </p>
          <h2 className="mt-3 text-3xl font-black">{copy.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {labels.scopeDescription}
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#ccff00]">
            {labels.scopeTitle}: {selectedServices.length}
          </p>
          <label className="mt-8 block max-w-lg text-xs font-bold uppercase tracking-widest text-white/55">
            {labels.creators}{" "}
            <span className="float-end text-[#ccff00]">{count}</span>
            <input
              type="range"
              min="1"
              max="8"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="mt-4 h-1 w-full accent-[#ccff00]"
            />
          </label>
        </div>
        <div className="border-s border-white/10 ps-6 lg:ps-8">
          <p className="text-xs uppercase tracking-widest text-white/40">
            {labels.estimate}
          </p>
          <p className="mt-2 text-6xl font-black text-[#ccff00]">
            ${savings.toLocaleString()}
          </p>
          <button
            onClick={() => setActive(active)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#ccff00]"
          >
            {selectedServices.length > 0 ? labels.consultation : labels.build}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>
    </>
  );
}
