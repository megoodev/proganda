import { getTranslations } from "next-intl/server";
import { creators } from "@/lib/data";
import { CreatorProfileClient } from "./_components/CreatorProfileClient";

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.id }));
}

export default async function CreatorProfile({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const creator = creators.find((item) => item.id === slug) || {
    id: "mazen-shahin",
    name: "مازن محمد شاهين (Mazen Shahin)",
    handle: "@mazen._shahin",
    location: "Mansoura / Port Said, Egypt",
    niche: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop",
    reach: "5M+",
    engagement: "471K Likes",
    platforms: ["Instagram", "TikTok"],
    accent: "#3AA7FD",
  };

  const t = await getTranslations({ locale, namespace: "creators" });
  const tProfile = await getTranslations({
    locale,
    namespace: "creatorProfile",
  });
  const creatorNames = t.raw("creatorNames") as Record<string, string>;
  const niches = t.raw("niches") as Record<string, string>;
  const translatedCreator = {
    ...creator,
    name: creatorNames[creator.id] ?? creator.name,
  };

  return (
    <CreatorProfileClient
      creator={translatedCreator}
      creatorNiche={niches[creator.niche] ?? creator.niche}
      t={{
        profile: t("profile"),
        whatsappContact: tProfile("whatsappContact"),
        shareProfile: tProfile("shareProfile"),
        egyptVerified: tProfile("egyptVerified"),
        highReachInfluencer: tProfile("highReachInfluencer"),
        socialLinksChannels: tProfile("socialLinksChannels"),
        audienceInsights: tProfile("audienceInsights"),
        locationGeographic: tProfile("locationGeographic"),
        topGeographies: tProfile("topGeographies"),
        topActiveCities: tProfile("topActiveCities"),
        averageBudget: tProfile("averageBudget"),
        flexibleBudget: tProfile("flexibleBudget"),
        servicesPricing: tProfile("servicesPricing"),
        selectAdCampaign: tProfile("selectAdCampaign"),
        mostPopular: tProfile("mostPopular"),
        turnaround: tProfile("turnaround"),
        bookViaWhatsApp: tProfile("bookViaWhatsApp"),
        standardStoryAd: tProfile("standardStoryAd"),
        standardStoryAdDesc: tProfile("standardStoryAdDesc"),
        fullCampaignReel: tProfile("fullCampaignReel"),
        fullCampaignReelDesc: tProfile("fullCampaignReelDesc"),
        multiPlatformBundle: tProfile("multiPlatformBundle"),
        multiPlatformBundleDesc: tProfile("multiPlatformBundleDesc"),
        promo: tProfile("promo"),
        monthly: tProfile("monthly"),
        audience: tProfile("audience"),
        totalEngagement: tProfile("totalEngagement"),
        bio: tProfile("bio"),
        grade: tProfile("grade"),
        contractDuration: tProfile("contractDuration"),
        topCountries: tProfile.raw("topCountries") as string[],
        topCities: tProfile.raw("topCities") as string[],
        durationLabel: tProfile("durationLabel"),
        budgetLabel: tProfile("budgetLabel"),
        instagramReach: tProfile("instagramReach"),
        instagramFollowers: tProfile("instagramFollowers"),
        tiktokFollowers: tProfile("tiktokFollowers"),
        tiktokLikes: tProfile("tiktokLikes"),
        turnaroundValues: tProfile.raw("turnaroundValues") as string[],
      }}
    />
  );
}
