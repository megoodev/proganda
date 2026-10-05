import { Separator } from "@/components/ui/separator";
import { HeroSection } from "./hero-section";
import { StatsBar } from "./stats-bar";
import { WhyJoinSection } from "./why-join-section";
import { CreatorsSection } from "./creators-section";
import { WorkflowSection } from "./workflow-section";
import { PartnerSection } from "./partner-section";
import { BrandsCta } from "./brands-cta";
import { FinalCta } from "./final-cta";

export async function HomePage({ locale }: { locale: "en" | "ar" }) {
  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground">
      <HeroSection />
      <StatsBar locale={locale} />
      <WhyJoinSection />
      <Separator />
      <CreatorsSection />
      <Separator />
      <WorkflowSection />
      <Separator />
      <PartnerSection />
      <BrandsCta />
      {/* Featured ads: add here once the Ads feature exists */}
      <FinalCta />
    </main>
  );
}
