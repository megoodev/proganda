import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Globe,
  MapPin,
  Phone,
  Share2,
  Star,
  TrendingUp,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Creator } from "@/lib/data";

// ─── SVG Social Icons Components ──────────────────────────────
function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.54-1.28 2.53.01.8.42 1.58 1.07 2.06.84.62 1.97.77 2.97.42 1.05-.35 1.86-1.28 2.05-2.37.13-.8.12-1.62.12-2.43V.02z" />
    </svg>
  );
}

interface CreatorProfileClientProps {
  creator: Creator;
  creatorNiche: string;
  t: {
    profile: string;
    whatsappContact: string;
    shareProfile: string;
    egyptVerified: string;
    highReachInfluencer: string;
    socialLinksChannels: string;
    audienceInsights: string;
    locationGeographic: string;
    topGeographies: string;
    topActiveCities: string;
    averageBudget: string;
    flexibleBudget: string;
    servicesPricing: string;
    selectAdCampaign: string;
    mostPopular: string;
    turnaround: string;
    bookViaWhatsApp: string;
    standardStoryAd: string;
    standardStoryAdDesc: string;
    fullCampaignReel: string;
    fullCampaignReelDesc: string;
    multiPlatformBundle: string;
    multiPlatformBundleDesc: string;
    promo: string;
    monthly: string;
    audience: string;
    totalEngagement: string;
    bio: string;
    grade: string;
    contractDuration: string;
    topCountries: string[];
    topCities: string[];
    durationLabel: string;
    budgetLabel: string;
    instagramReach: string;
    instagramFollowers: string;
    tiktokFollowers: string;
    tiktokLikes: string;
    turnaroundValues: string[];
  };
}

export function CreatorProfileClient({
  creator,
  creatorNiche,
  t,
}: CreatorProfileClientProps) {
  const {
    whatsappContact,
    shareProfile,
    egyptVerified,
    highReachInfluencer,
    socialLinksChannels,
    audienceInsights,
    locationGeographic,
    topGeographies,
    topActiveCities,
    averageBudget,
    flexibleBudget,
    servicesPricing,
    selectAdCampaign,
    mostPopular,
    turnaround,
    bookViaWhatsApp,
    standardStoryAd,
    standardStoryAdDesc,
    fullCampaignReel,
    fullCampaignReelDesc,
    multiPlatformBundle,
    multiPlatformBundleDesc,
    promo,
    monthly,
    audience,
    totalEngagement,
    bio,
    grade,
    contractDuration,
    topCountries,
    topCities,
    durationLabel,
    budgetLabel,
    instagramReach,
    instagramFollowers,
    tiktokFollowers,
    tiktokLikes,
    turnaroundValues,
  } = t;

  const creatorDetails = {
    bio,
    mobile: "https://wa.me/201003634700",
    grade,
    budgetRange: "1,500 - 10,000 EGP",
    contractDuration,
    demographics: {
      topCountries,
      topCities,
    },
    socialLinks: {
      instagram:
        "https://www.instagram.com/mazen._shahin?igsh=MXh4bDR0dWE2cm81bg%3D%3D&utm_source=qr",
      tiktok: "https://www.tiktok.com/@mazenshahin917?_r=1&_t=ZS-983p8YSvW5d",
    },
    packages: [
      {
        title: standardStoryAd,
        description: standardStoryAdDesc,
        price: "1,500 EGP",
        turnaround: turnaroundValues[0],
      },
      {
        title: fullCampaignReel,
        description: fullCampaignReelDesc,
        price: "5,000 EGP",
        popular: true,
        turnaround: turnaroundValues[1],
      },
      {
        title: multiPlatformBundle,
        description: multiPlatformBundleDesc,
        price: "10,000 EGP",
        turnaround: turnaroundValues[2],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6 sm:mb-8">
        <Link href="/creators" className="gap-2 text-muted-foreground">
          <ArrowLeft className="size-4" /> {t.profile}
        </Link>
      </Button>

      {/* Main Profile Header & Hero Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Profile Card & Avatar */}
        <Card className="overflow-hidden p-0 lg:col-span-5 flex flex-col justify-between">
          <div className="relative aspect-[4/5] min-h-[420px] w-full overflow-hidden">
            <Image
              src={creator.image}
              alt={creator.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 uppercase tracking-widest text-primary"
              >
                {creatorNiche}
              </Badge>
              <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
                {creator.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {creator.handle} •{" "}
                {creatorDetails.demographics.topCities.join(" / ")}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 divide-x divide-border bg-border">
            <Button
              variant="secondary"
              asChild
              className="h-12 rounded-none gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <a
                href={creatorDetails.mobile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="size-4" /> {whatsappContact}
              </a>
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none gap-2 bg-card text-xs font-bold uppercase tracking-wider hover:bg-accent"
            >
              <Share2 className="size-4" /> {shareProfile}
            </Button>
          </div>
        </Card>

        {/* Creator Info & Performance Stats */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {egyptVerified} ({creatorDetails.grade})
              </span>
              <Badge
                variant="secondary"
                className="gap-1.5 font-semibold text-amber-500"
              >
                <Star className="size-3.5 fill-amber-500" />
                <span>{creatorDetails.grade}</span>
              </Badge>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {highReachInfluencer}
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              {creatorDetails.bio}
            </p>

            {/* Main Key Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["5M", instagramReach, monthly],
                ["20K", instagramFollowers, audience],
                ["11K", tiktokFollowers, audience],
                ["471K", tiktokLikes, totalEngagement],
              ].map(([value, label, sub]) => (
                <Card key={label} className="p-4 shadow-none border-border">
                  <p className="text-2xl font-black text-primary">{value}</p>
                  <p className="mt-1 text-xs font-bold text-foreground">
                    {label}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">
                    {sub}
                  </p>
                </Card>
              ))}
            </div>

            {/* Contract & Budget Details */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Badge
                variant="outline"
                className="gap-2 border-primary/30 bg-primary/5 px-3 py-1.5 font-medium text-primary"
              >
                <Clock className="size-4" /> {durationLabel}:{" "}
                {creatorDetails.contractDuration}
              </Badge>
              <Badge
                variant="outline"
                className="gap-2 border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 font-medium text-emerald-600 dark:text-emerald-400"
              >
                <TrendingUp className="size-4" /> {budgetLabel}:{" "}
                {creatorDetails.budgetRange}
              </Badge>
            </div>
          </div>

          {/* Social Platforms & Direct Links */}
          <div className="mt-10">
            <Separator className="mb-6" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {socialLinksChannels}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={creatorDetails.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="outline"
                  className="gap-2 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm hover:border-primary"
                >
                  <InstagramIcon className="size-4 text-pink-500" /> Instagram
                  (20K)
                </Badge>
              </a>
              <a
                href={creatorDetails.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="outline"
                  className="gap-2 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm hover:border-primary"
                >
                  <TikTokIcon className="size-4 text-foreground" /> TikTok (11K)
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Audience Demographics Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {audienceInsights}
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {locationGeographic}
          </h3>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {topGeographies}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs font-semibold text-foreground">
                {creatorDetails.demographics.topCountries.map((country) => (
                  <li key={country} className="flex items-center gap-2">
                    <Globe className="size-3.5 text-primary" />
                    <span>{country}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {topActiveCities}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs font-semibold text-foreground">
                {creatorDetails.demographics.topCities.map((city) => (
                  <li key={city} className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-primary" />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {averageBudget}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">
                {creatorDetails.budgetRange}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {flexibleBudget}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing & Deliverables Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {servicesPricing}
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {selectAdCampaign}
          </h3>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {creatorDetails.packages.map((pkg) => (
            <Card
              key={pkg.title}
              className={`relative flex flex-col justify-between transition ${
                pkg.popular
                  ? "border-primary shadow-md"
                  : "hover:border-primary/50"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 right-6 bg-primary text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  {mostPopular}
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  {pkg.title}
                </CardTitle>
                <CardDescription className="mt-2 text-xs leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{promo}</span>
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex-col items-stretch border-t border-border pt-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>
                    {turnaround}: {pkg.turnaround}
                  </span>
                </div>
                <Button
                  variant={pkg.popular ? "default" : "outline"}
                  asChild
                  className="w-full text-xs font-bold uppercase tracking-wider"
                >
                  <a
                    href={creatorDetails.mobile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookViaWhatsApp}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
