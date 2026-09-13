import React from "react";

interface FreeConsultBannerProps {
  /** Text to display inside the banner */
  text: string;
}

export default function FreeConsultBanner({ text }: FreeConsultBannerProps) {
  return (
    <section className="mb-8 rounded border border-[#3AA7FD] bg-[#3AA7FD]/10 p-4 text-center text-[#3AA7FD]">
      <p className="text-sm font-medium">{text}</p>
    </section>
  );
}
