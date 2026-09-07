export type Niche = "Fashion" | "Tech" | "Lifestyle" | "Gaming";
export type Platform = "TikTok" | "Instagram" | "YouTube";
export type ServiceTierId = "tier_1" | "tier_2" | "tier_3";

export type ServiceTier = {
  id: ServiceTierId;
  name: string;
  eyebrow: string;
  scope: string;
  offer: string;
  features: string[];
  savingsRate: number;
  accent: "lime" | "purple";
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  niche: Niche;
  platforms: Platform[];
  reach: string;
  engagement: string;
  location: string;
  image: string;
  accent: string;
};

export type CaseStudy = {
  brand: string;
  category: string;
  creator: string;
  views: string;
  roi: string;
  color: string;
};

export const serviceTiers: ServiceTier[] = [
  {
    id: "tier_1",
    name: "Connect Only",
    eyebrow: "01 / direct access",
    scope: "Matchmaking and direct introduction between brand and creator.",
    offer: "Buy 2 Matches, Get 1 Free",
    features: [
      "Curated creator shortlist",
      "Warm introductions",
      "Campaign fit notes",
    ],
    savingsRate: 0.12,
    accent: "lime",
  },
  {
    id: "tier_2",
    name: "Full Management",
    eyebrow: "02 / flagship",
    scope:
      "Matching, contracting, studio filming, editing, and end-to-end campaign delivery.",
    offer: "15% Off 3-Month Retainer + Free Video Editing Upgrade",
    features: [
      "Talent and contract management",
      "In-house studio production",
      "Edit, delivery, and reporting",
    ],
    savingsRate: 0.27,
    accent: "purple",
  },
  {
    id: "tier_3",
    name: "One-Tail Pilot",
    eyebrow: "03 / one campaign",
    scope: "Single custom campaign execution for one brand-creator project.",
    offer: "10% Starter Discount + 100% Credit toward Tier 2 within 14 days",
    features: [
      "One custom campaign brief",
      "Creator pairing and production",
      "Tier 2 upgrade credit",
    ],
    savingsRate: 0.1,
    accent: "lime",
  },
];

export const creators: Creator[] = [
  {
    id: "maya",
    name: "Maya Chen",
    handle: "@maya.moves",
    niche: "Fashion",
    platforms: ["TikTok", "Instagram"],
    reach: "2.8M",
    engagement: "8.4%",
    location: "LA / NYC",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85&auto=format&fit=crop",
    accent: "#ccff00",
  },
  {
    id: "jules",
    name: "Jules Okafor",
    handle: "@julescodes",
    niche: "Tech",
    platforms: ["YouTube", "TikTok"],
    reach: "1.4M",
    engagement: "11.2%",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85&auto=format&fit=crop",
    accent: "#ff007f",
  },
  {
    id: "rio",
    name: "Rio Santos",
    handle: "@rioszn",
    niche: "Lifestyle",
    platforms: ["Instagram", "YouTube"],
    reach: "890K",
    engagement: "14.8%",
    location: "Miami",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85&auto=format&fit=crop",
    accent: "#8a2be2",
  },
  {
    id: "sky",
    name: "Sky Williams",
    handle: "@skyplays",
    niche: "Gaming",
    platforms: ["TikTok", "YouTube"],
    reach: "3.2M",
    engagement: "9.6%",
    location: "Atlanta",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85&auto=format&fit=crop",
    accent: "#00e5ff",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    brand: "LUMEN",
    category: "Beauty drop",
    creator: "Maya Chen + 12 creators",
    views: "18.4M",
    roi: "4.8x",
    color: "#ccff00",
  },
  {
    brand: "NOVA",
    category: "Product launch",
    creator: "Jules Okafor",
    views: "9.7M",
    roi: "3.6x",
    color: "#ff007f",
  },
  {
    brand: "VANTA",
    category: "Culture campaign",
    creator: "Rio Santos + 8 creators",
    views: "26.1M",
    roi: "6.2x",
    color: "#8a2be2",
  },
];

export const brandNames = [
  "NIKE",
  "SONY",
  "GLOSSIER",
  "SPOTIFY",
  "SAMSUNG",
  "ADIDAS",
  "RED BULL",
];

export function filterCreators(filters: {
  niche?: string;
  platform?: string;
  query?: string;
}) {
  const query = filters.query?.toLowerCase().trim();
  return creators.filter((creator) => {
    const matchesNiche =
      !filters.niche ||
      filters.niche === "All" ||
      creator.niche === filters.niche;
    const matchesPlatform =
      !filters.platform ||
      filters.platform === "All" ||
      creator.platforms.includes(filters.platform as Platform);
    const matchesQuery =
      !query ||
      `${creator.name} ${creator.handle} ${creator.niche}`
        .toLowerCase()
        .includes(query);
    return matchesNiche && matchesPlatform && matchesQuery;
  });
}
