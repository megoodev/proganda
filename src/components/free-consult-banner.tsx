import React from 'react';

interface FreeConsultBannerProps {
  /** Text to display inside the banner */
  text: string;
}

export default function FreeConsultBanner({ text }: FreeConsultBannerProps) {
  return (
    <section className="mb-8 rounded border border-[#ccff00] bg-[#ccff00]/10 p-4 text-center text-[#ccff00]">
      <p className="text-sm font-medium">{text}</p>
    </section>
  );
}
