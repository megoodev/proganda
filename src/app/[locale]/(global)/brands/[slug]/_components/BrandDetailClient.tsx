import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  TrendingUp,
  Sparkles,
  Building2,
  Users,
  Play,
  BarChart3,
  Target,
  Zap,
  Check,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Brand } from "@/lib/data";

interface BrandDetailClientProps {
  brand: Brand;
  t: {
    back: string;
    servicesUsed: string;
    cta: string;
    views: string;
    roi: string;
    connectDirectly: string;
    executionSummary: string;
    industry: string;
    production: string;
    channels: string;
    campaignStatus: string;
    completedVerified: string;
    inHouseProduction: string;
    performanceInsights: string;
    keyCampaignImpact: string;
    strategicExecution: string;
    producedContent: string;
    campaignMediaDeliverables: string;
    featuredCreators: string;
    castCollaborators: string;
    readyToLaunch: string;
    readyToLaunchDesc: string;
    platformsList: string;
    directConversions: string;
    engagementRate: string;
    engagementChange: string;
    totalReach: string;
    uniqueViewers: string;
    strategyIntro: string;
    campaignMedia: Array<{
      title: string;
      creator: string;
      type: string;
      views: string;
    }>;
    strategyBreakdown: Array<{
      step: string;
      title: string;
      description: string;
    }>;
    creatorCollaborators: Array<{
      name: string;
      role: string;
      reach: string;
    }>;
  };
}

export function BrandDetailClient({ brand, t }: BrandDetailClientProps) {
  const {
    executionSummary,
    industry,
    production,
    channels,
    campaignStatus,
    completedVerified,
    inHouseProduction,
    performanceInsights,
    keyCampaignImpact,
    strategicExecution,
    producedContent,
    campaignMediaDeliverables,
    featuredCreators,
    castCollaborators,
    readyToLaunch,
    readyToLaunchDesc,
    platformsList,
    directConversions,
    engagementRate,
    engagementChange,
    totalReach,
    uniqueViewers,
    strategyIntro,
    campaignMedia: translatedMedia,
    strategyBreakdown,
    creatorCollaborators: translatedCollaborators,
  } = t;
  const heroImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80";
  const logoImage =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80";
  const campaignImages = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
  ];
  const collaboratorImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  ];

  const campaignMetrics = [
    { label: t.views, value: brand.views, change: "+142%", icon: Eye },
    {
      label: t.roi,
      value: brand.roi,
      change: directConversions,
      icon: TrendingUp,
    },
    {
      label: engagementRate,
      value: "11.4%",
      change: engagementChange,
      icon: BarChart3,
    },
    { label: totalReach, value: "8.6M", change: uniqueViewers, icon: Target },
  ];

  const campaignMedia = translatedMedia.map((media, index) => ({
    ...media,
    image: campaignImages[index],
  }));
  const creatorCollaborators = translatedCollaborators.map(
    (creator, index) => ({
      ...creator,
      avatar: collaboratorImages[index],
    }),
  );

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* 1. TOP NAVIGATION & HERO BANNER */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-12 lg:px-8 lg:pt-14">
        {/* Back Link */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3 mb-6 text-muted-foreground hover:text-primary"
        >
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t.back}
          </Link>
        </Button>

        {/* Ambient Glow Background */}
        <div
          className="absolute -top-20 right-10 -z-10 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: brand.color || "var(--primary)" }}
        />

        {/* Hero Cover Image */}
        <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl">
          <img
            src={heroImage}
            alt={brand.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Logo Badge Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-background/80 p-3.5 backdrop-blur-md lg:bottom-8 lg:left-8">
            <img
              src={logoImage}
              alt={brand.name}
              className="size-14 rounded-xl object-cover ring-1 ring-border/50 sm:size-16"
            />
            <div>
              <h1 className="text-xl font-black text-foreground sm:text-3xl">
                {brand.name}
              </h1>
              <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                {brand.industry}
              </p>
            </div>
          </div>
        </div>

        {/* Header Title & Campaign Introduction */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Badge
              variant="outline"
              className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: brand.color }}
            >
              <Building2 className="size-3.5" />
              {brand.industry}
            </Badge>

            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]">
              {brand.campaign}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {brand.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            <Card className="border-border/80 bg-card/90 shadow-xl backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Zap className="size-4" />
                  {executionSummary}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="font-semibold text-foreground">
                    {industry}:
                  </span>
                  <span>{brand.industry}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="font-semibold text-foreground">
                    {production}:
                  </span>
                  <span>{inHouseProduction}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="font-semibold text-foreground">
                    {channels}:
                  </span>
                  <span>{platformsList}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">
                    {campaignStatus}:
                  </span>
                  <span className="font-bold text-emerald-500">
                    {completedVerified}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* 2. PERFORMANCE METRICS DASHBOARD */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <Badge
            variant="outline"
            className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <BarChart3 className="size-3.5" />
            {performanceInsights}
          </Badge>
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
            {keyCampaignImpact}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {campaignMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.label}
                className="border-border/60 bg-card/80 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <Icon className="size-4 text-primary" />
                  </div>
                  <p
                    className="mt-3 text-3xl font-black tracking-tight sm:text-4xl"
                    style={{ color: brand.color || "var(--primary)" }}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* 3. CAMPAIGN STRATEGY & SERVICES */}
      <section className="bg-muted/20 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Badge
                variant="outline"
                className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
              >
                <Sparkles className="size-3.5" />
                {t.servicesUsed}
              </Badge>
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">
                {strategicExecution}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {strategyIntro}
              </p>

              <div className="mt-8 grid gap-3">
                {brand.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/80 p-4 text-sm font-bold text-foreground transition-colors hover:border-primary/40"
                  >
                    <div className="rounded-full bg-primary/10 p-1 text-primary">
                      <Check className="size-4" />
                    </div>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4">
              {strategyBreakdown.map((item) => (
                <Card
                  key={item.step}
                  className="border-border/60 bg-card/80 p-6"
                >
                  <CardContent className="flex items-start gap-4 p-0">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-xs font-black text-primary">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 4. CAMPAIGN MEDIA & DELIVERABLES GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Play className="size-3.5" />
              {producedContent}
            </Badge>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              {campaignMediaDeliverables}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaignMedia.map((media, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border-border/60 bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <img
                  src={media.image}
                  alt={media.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-md text-[10px] font-bold uppercase">
                  {media.type}
                </Badge>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold text-primary">
                    {media.creator}
                  </p>
                  <h3 className="text-lg font-black text-white">
                    {media.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Eye className="size-3.5 text-primary" />
                    <span>{media.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 5. CREATOR COLLABORATORS & CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-8">
          <Badge
            variant="outline"
            className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Users className="size-3.5" />
            {featuredCreators}
          </Badge>
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
            {castCollaborators}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creatorCollaborators.map((creator, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border-border/60 bg-card/60 transition-all hover:border-primary/50"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="size-14 rounded-full object-cover ring-2 ring-primary/20 transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <h3 className="font-bold text-foreground">{creator.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {creator.role}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-primary">
                    {creator.reach}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Conversion Card */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-10">
          <div>
            <h3 className="text-2xl font-black text-foreground sm:text-3xl">
              {readyToLaunch}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {readyToLaunchDesc}
            </p>
          </div>

          <Button
            size="lg"
            asChild
            className="gap-2 font-bold shadow-lg shadow-primary/25"
          >
            <Link href="/auth/register?role=brand">
              {t.cta}
              <ArrowUpRight className="size-4 rtl:rotate-90" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
