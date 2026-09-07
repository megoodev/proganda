"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { serviceTiers, type ServiceTierId } from "@/lib/data";

export function ServiceTiers({
  onSelectTier,
}: {
  onSelectTier: (tier: ServiceTierId) => void;
}) {
  const [activeTier, setActiveTier] = useState<ServiceTierId>("tier_2");
  const [creatorCount, setCreatorCount] = useState(3);
  const selected =
    serviceTiers.find((tier) => tier.id === activeTier) ?? serviceTiers[1];
  const estimatedSavings = Math.round(
    creatorCount * 420 * selected.savingsRate,
  );

  return (
    <section
      id="services"
      className="relative border-y border-white/10 bg-[#101010] px-5 py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(138,43,226,.18),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(204,255,0,.08),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              <Sparkles className="size-3.5" /> 01.5 / choose your edge
            </p>
            <h2 className="max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Three ways to
              <br />
              <span className="text-white/35">make noise.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Start with a sharp introduction or hand us the whole production.
            Every tier is built to compound your momentum.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {serviceTiers.map((tier) => {
            const isActive = activeTier === tier.id;
            const borderColor =
              tier.accent === "purple" ? "#8a2be2" : "#ccff00";
            return (
              <article
                key={tier.id}
                className={`relative flex flex-col border bg-white/[.04] p-6 backdrop-blur-xl transition duration-300 sm:p-7 ${isActive ? "-translate-y-1 shadow-[0_0_34px_rgba(204,255,0,.12)]" : "border-white/10 hover:border-white/30"}`}
                style={
                  isActive
                    ? { borderColor, boxShadow: `0 0 34px ${borderColor}22` }
                    : undefined
                }
              >
                {tier.id === "tier_2" && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#8a2be2] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    popular
                  </span>
                )}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {tier.eyebrow}
                </p>
                <h3 className="mt-8 text-3xl font-black tracking-tight">
                  {tier.name}
                </h3>
                <p className="mt-4 min-h-16 text-sm leading-relaxed text-white/55">
                  {tier.scope}
                </p>
                <p className="mt-6 border-y border-white/10 py-4 text-sm font-bold leading-relaxed text-[#ccff00]">
                  {tier.offer}
                </p>
                <ul className="my-7 grid gap-3 text-sm text-white/70">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#ccff00]" />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className="mt-auto inline-flex items-center justify-between border border-white/20 px-4 py-3 text-sm font-bold transition hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                >
                  Select this tier <ArrowRight className="size-4" />
                </button>
                <button
                  onClick={() => setActiveTier(tier.id)}
                  className="mt-4 text-left text-[10px] font-bold uppercase tracking-widest text-white/35 hover:text-white"
                >
                  Use in savings calculator
                </button>
              </article>
            );
          })}
        </div>
        <div className="mt-16 grid gap-8 border border-white/10 bg-black/20 p-6 sm:p-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
              Savings calculator
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight">
              Bundle more. Keep more.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/45">
              Estimate the value of your creator bundle with {selected.name}.
            </p>
            <label className="mt-8 block max-w-lg text-xs font-bold uppercase tracking-widest text-white/55">
              creators in this bundle{" "}
              <span className="float-right text-[#ccff00]">{creatorCount}</span>
              <input
                type="range"
                min="1"
                max="8"
                value={creatorCount}
                onChange={(event) =>
                  setCreatorCount(Number(event.target.value))
                }
                className="mt-4 h-1 w-full cursor-pointer accent-[#ccff00]"
              />
              <span className="mt-2 flex justify-between text-[10px] text-white/25">
                <span>1 creator</span>
                <span>8 creators</span>
              </span>
            </label>
          </div>
          <div className="border-l border-white/10 pl-6 lg:pl-8">
            <p className="text-xs uppercase tracking-widest text-white/40">
              estimated savings
            </p>
            <p className="mt-2 text-6xl font-black text-[#ccff00]">
              ${estimatedSavings.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-white/45">
              based on {selected.name} and {creatorCount}{" "}
              {creatorCount === 1 ? "creator" : "creators"}
            </p>
            <button
              onClick={() => onSelectTier(activeTier)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#ccff00]"
            >
              Build this bundle <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
