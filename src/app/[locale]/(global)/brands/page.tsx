import { getTranslations } from "next-intl/server";
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  ArrowUpRight,
  Layers 
} from "lucide-react";
import { BrandDirectory } from "@/components/brand-directory";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Featured Brand Campaigns with visual media & creator collaborations
const featuredBrandCampaigns = [
  {
    id: "brand-1",
    brandName: "Aura Tech",
    category: "Consumer Tech",
    creatorName: "Lina Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    campaignImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    views: "4.2M",
    roi: "5.4x",
  },
  {
    id: "brand-2",
    brandName: "Velo Sportswear",
    category: "Fitness & Apparel",
    creatorName: "Kareem Hassan",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    campaignImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    views: "8.9M",
    roi: "6.2x",
  },
  {
    id: "brand-3",
    brandName: "Glow & Co",
    category: "Beauty & Lifestyle",
    creatorName: "Maya Lin",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    campaignImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    views: "12.1M",
    roi: "7.1x",
  },
];

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl">
          <Badge 
            variant="outline" 
            className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Building2 className="size-3.5" />
            {t("eyebrow")}
          </Badge>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.08]">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("description")}
          </p>
        </div>
      </section>

      <Separator />

      {/* 2. FEATURED BRAND CREATOR CAMPAIGNS (VISUAL GALLERY) */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge 
              variant="outline" 
              className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-3.5" />
              Featured Case Studies
            </Badge>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              Brand x Creator Collaborations
            </h2>
          </div>
        </div>

        {/* Campaign Visual Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBrandCampaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              className="group overflow-hidden border-border/60 bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={campaign.campaignImage}
                  alt={campaign.brandName}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                {/* Top Badge: Category */}
                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-md text-[10px] font-bold uppercase">
                  {campaign.category}
                </Badge>

                {/* Creator Avatar Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-background/80 p-1.5 pr-3.5 backdrop-blur-md">
                    <img
                      src={campaign.creatorAvatar}
                      alt={campaign.creatorName}
                      className="size-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-foreground">
                      {campaign.creatorName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Info & Metrics */}
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-foreground">
                    {campaign.brandName}
                  </h3>
                  <div className="flex items-center gap-1 text-primary text-xs font-bold">
                    <span>Case Study</span>
                    <ArrowUpRight className="size-3.5 rtl:rotate-90" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-muted-foreground">
                    <Eye className="size-4 text-primary" />
                    <span>{campaign.views} {t("views")}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <TrendingUp className="size-4" />
                    <span>{campaign.roi} {t("roi")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 3. FULL BRAND DIRECTORY */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <BrandDirectory
          labels={{
            all: t("all"),
            caseStudy: t("caseStudy"),
            views: t("views"),
            roi: t("roi"),
          }}
        />
      </section>

    </main>
  );
}