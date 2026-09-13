"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

const backgroundImages = [
  "/assits/backgrounds/background.jpg",
  "/assits/backgrounds/background-2.jpg",
  "/assits/backgrounds/background.3.jpg",
  "/assits/backgrounds/dmitrii-zhodzishskii-5aEHOQrb2Qk-unsplash.jpg",
  "/assits/backgrounds/IMG_2032.JPG.jpeg",
];

export function HomeHeroCarousel({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % backgroundImages.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate  mx-auto flex items-end overflow-hidden px-5 pb-20 pt-24 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[#111111]" />
      {backgroundImages.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-1000 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,13,13,.94)_0%,rgba(13,13,13,.72)_48%,rgba(13,13,13,.3)_100%)]" /> */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/80" />
      <div className="relative mx-2   lg:mx-40  max-w-7xl ">
        <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#3AA7FD]">
          <Sparkles className="size-4" /> {eyebrow}
        </p>
        <h1 className="max-w-5xl text-[clamp(3.6rem,10vw,9rem)] text-white/80 dark:text-white  font-black uppercase leading-[.84] tracking-[-0.09em]">
          {title}
        </h1>
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-white/80 dark:text-white/50 ">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/creators"
              className="inline-flex items-center gap-3 bg-[#3AA7FD] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
            >
              {primaryCta} <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-[#3AA7FD] text-[#3AA7FD] bg-black/20 px-5 py-3 text-sm font-bold transition hover:text-black hover:bg-[#3AA7FD] transition-all duration-300 "
            >
              {secondaryCta} <ArrowDownRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-3" aria-label="Hero slides">
          {backgroundImages.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
              className={`h-1 transition-all duration-300 ${index === activeSlide ? "w-12 bg-[#3AA7FD]" : "w-5 bg-white/40 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
