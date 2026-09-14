"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ContactFAQ({
  title,
  subtitle,
  faqs,
}: {
  title: string;
  subtitle: string;
  faqs: Array<{ q: string; a: string }>;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary mb-4 shadow-sm">
          <HelpCircle className="size-3.5" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
            Support & Clarity
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.05]">
          {title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="grid gap-3 w-full"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-sm w-full border border-border/60 bg-card/40 hover:bg-card/80 transition-all duration-200 px-6 data-[state=open]:border-primary/80 data-[state=open]:bg-card/90 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 data-[state=open]:ring-1 data-[state=open]:ring-primary/30"
          >
            <AccordionTrigger className="py-5 hover:no-underline font-bold text-sm sm:text-base text-foreground gap-4 text-start">
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-primary font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {faq.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}