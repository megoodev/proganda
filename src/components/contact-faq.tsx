"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function ContactFAQ({
  title,
  subtitle,
  faqs,
}: {
  title: string;
  subtitle: string;
  faqs: Array<{ q: string; a: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((curr) => (curr === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="max-w-2xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="size-4 text-[#ccff00]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Support & Clarity
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.05em] text-white">
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/50 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-3 max-w-4xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#ccff00]/60 bg-white/[0.03]"
                  : "border-white/10 bg-[#141414] hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-5 text-start font-bold text-sm sm:text-base text-white"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#ccff00]">
                    0{index + 1}
                  </span>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#ccff00]" : "text-white/40"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
