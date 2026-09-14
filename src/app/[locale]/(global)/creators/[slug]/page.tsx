import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  Clock,
  Eye,
  Globe,
  Mail,
  Play,
  Share2,
  ShieldCheck,
  Star,
  TrendingUp,
  Video,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { creators } from "@/lib/data";

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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// ─── SVG Social Icons Components ──────────────────────────────
function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

function SnapchatIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.001 0c-4.108 0-7.398 2.531-7.398 6.643 0 1.92.748 3.511 1.66 4.707.195.257.291.464.2.75-.12.38-.64 1.96-1.433 2.12-.44.09-.96-.13-1.46-.35-.38-.17-.89-.39-1.29-.39-.42 0-.74.19-.9.51-.15.31-.05.74.25 1.09.84.99 2.19 1.73 3.65 1.73.4 0 .8-.05 1.19-.15.53-.14.93.18 1.34.48.79.59 1.74 1.3 4.22 1.3 2.47 0 3.43-.71 4.22-1.3.41-.3 81-.62 1.34-.48.39.1.79.15 1.19.15 1.46 0 2.81-.74 3.65-1.73.3-.35.4-.78.25-1.09-.16-.32-.48-.51-.9-.51-.4 0-.91.22-1.29.39-.5.22-1.02.44-1.46.35-.793-.16-1.313-1.74-1.433-2.12-.091-.286.005-.493.2-.75.912-1.196 1.66-2.787 1.66-4.707C19.399 2.531 16.109 0 12.001 0z" />
    </svg>
  );
}

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.id }));
}

interface PageProps<T> {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function CreatorProfile({
  params,
}: PageProps<"/[locale]/creators/[slug]">) {
  const { slug, locale } = await params;
  const creator = creators.find((item) => item.id === slug);

  if (!creator) notFound();

  const t = await getTranslations({ locale, namespace: "creators" });

  const creatorDetails = {
    bio: "Specialized in high-converting UGC videos, tech unboxings, and direct-response ad creative. Over 3 years helping D2C brands scale their TikTok & Meta ad campaigns.",
    languages: ["Arabic (Native)", "English (Fluent)"],
    avgTurnaround: "3-5 Business Days",
    demographics: {
      gender: { male: 35, female: 65 },
      topCountries: ["Saudi Arabia (45%)", "UAE (30%)", "Egypt (15%)"],
      ageRange: "18-34 (82%)",
    },
    packages: [
      {
        title: "Single UGC Video",
        description:
          "1x Vertical Reel/TikTok Video (15-30s) including raw hook variations and full script.",
        price: "$350",
        turnaround: "3 Days",
      },
      {
        title: "Ad Scale Pack",
        description:
          "3x Videos + 3x Hooks + 2x CTAs + 30 Days Digital Usage Rights.",
        price: "$850",
        popular: true,
        turnaround: "5 Days",
      },
      {
        title: "Raw Content Bundle",
        description:
          "Raw footages, B-roll, unedited voiceovers, and product demonstration clips.",
        price: "$500",
        turnaround: "3 Days",
      },
    ],
    caseStudies: [
      {
        brand: "LUMEN Skincare",
        metric: "+145% ROAS",
        desc: "Created 4 UGC hooks that dropped Cost Per Acquisition (CPA) by 32% on Meta Ads.",
      },
      {
        brand: "VANTA Tech",
        metric: "1.2M+ Views",
        desc: "Unboxing reel went viral organically and generated over 400+ direct website orders.",
      },
    ],
  };

  const renderSocialIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("instagram"))
      return <InstagramIcon className="size-4 text-pink-500" />;
    if (lower.includes("youtube"))
      return <YoutubeIcon className="size-4 text-red-500" />;
    if (lower.includes("tiktok"))
      return <TikTokIcon className="size-4 text-foreground" />;
    if (lower.includes("snapchat"))
      return <SnapchatIcon className="size-4 text-amber-400" />;
    return <Video className="size-4 text-primary" />;
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6 sm:mb-8">
        <Link href="/creators" className="gap-2 text-muted-foreground">
          <ArrowLeft className="size-4" /> {t("profile")}
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
                {creator.niche}
              </Badge>
              <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
                {creator.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {creator.handle} • {creator.location}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 divide-x divide-border bg-border">
            <Button
              variant="secondary"
              className="h-12 rounded-none gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <Mail className="size-4" /> Book Creator
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-none gap-2 bg-card text-xs font-bold uppercase tracking-wider hover:bg-accent"
            >
              <Share2 className="size-4" /> Share Profile
            </Button>
          </div>
        </Card>

        {/* Creator Info & Performance Stats */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {creator.location} / Verified Creator
              </span>
              <Badge variant="secondary" className="gap-1.5 font-semibold text-amber-500">
                <Star className="size-3.5 fill-amber-500" />
                <span>4.95</span>
                <span className="text-muted-foreground">(28 Reviews)</span>
              </Badge>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Built for high-converting content.
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              {creatorDetails.bio}
            </p>

            {/* Main Key Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                [t("reach"), creator.reach, "Total Audience"],
                [t("engagement"), creator.engagement, "Avg Engagement"],
                ["Audience", creatorDetails.demographics.ageRange, "Primary Age"],
                ["Turnaround", creatorDetails.avgTurnaround, "Avg Delivery"],
              ].map(([label, value, sub]) => (
                <Card key={label} className="p-4 shadow-none border-border">
                  <p className="text-2xl font-black text-primary">{value}</p>
                  <p className="mt-1 text-xs font-bold text-foreground">{label}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">{sub}</p>
                </Card>
              ))}
            </div>

            {/* Verification & Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Badge
                variant="outline"
                className="gap-2 border-primary/30 bg-primary/5 px-3 py-1.5 font-medium text-primary"
              >
                <BadgeCheck className="size-4" /> Usage rights ready
              </Badge>
              <Badge
                variant="outline"
                className="gap-2 border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 font-medium text-emerald-600 dark:text-emerald-400"
              >
                <ShieldCheck className="size-4" /> Brand safety verified
              </Badge>
              <Badge variant="secondary" className="gap-2 px-3 py-1.5 font-medium">
                <Clock className="size-4 text-muted-foreground" /> Fast Turnaround
              </Badge>
            </div>
          </div>

          {/* Social Platforms & Direct Links */}
          <div className="mt-10">
            <Separator className="mb-6" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Active Platforms & Handles
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {creator.platforms.map((platform) => (
                <Badge
                  key={platform}
                  variant="outline"
                  className="gap-2 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm"
                >
                  {renderSocialIcon(platform)}
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience Demographics Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Audience Insights
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Who watches this creator?
          </h3>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Gender Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-foreground">
                  <span>Female</span>
                  <span>{creatorDetails.demographics.gender.female}%</span>
                </div>
                <Progress value={creatorDetails.demographics.gender.female} />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-foreground">
                  <span>Male</span>
                  <span>{creatorDetails.demographics.gender.male}%</span>
                </div>
                <Progress value={creatorDetails.demographics.gender.male} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Top Geographies
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

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Age Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">
                {creatorDetails.demographics.ageRange}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mainly Gen-Z & Millennials with high purchasing power.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies / Proven Results Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Track Record
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Proven Campaign Results
          </h3>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {creatorDetails.caseStudies.map((study) => (
            <Card key={study.brand}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {study.brand}
                </CardTitle>
                <Badge variant="secondary" className="gap-1.5 bg-primary/10 font-bold text-primary">
                  <TrendingUp className="size-3.5" /> {study.metric}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-sm font-medium text-foreground">{study.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio / Sample Reels Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Portfolio & Creative Style
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Sample Reels & Ads
          </h3>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Product Unboxing",
              views: "45K",
              type: "TikTok Ad",
              img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&q=80&auto=format&fit=crop",
            },
            {
              title: "Problem / Solution",
              views: "120K",
              type: "Instagram Reel",
              img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop",
            },
            {
              title: "Testimonial & Review",
              views: "88K",
              type: "Spark Ad",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop",
            },
          ].map((reel) => (
            <Card
              key={reel.title}
              className="group relative flex aspect-[9/16] items-end overflow-hidden p-5 transition border-border hover:border-primary"
            >
              <Image
                src={reel.img}
                alt={reel.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              <div className="relative z-10 w-full">
                <Badge variant="default" className="mb-1 text-[10px] font-bold uppercase tracking-widest">
                  {reel.type}
                </Badge>
                <h4 className="text-lg font-bold text-foreground">{reel.title}</h4>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Eye className="size-3.5" /> {reel.views}
                  </span>
                  <Button size="icon" className="size-9 rounded-full transition group-hover:scale-110">
                    <Play className="ml-0.5 size-4 fill-current" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing & Deliverables Section */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-10 sm:mb-12" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Services & Packages
          </p>
          <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Select a Deliverable Package
          </h3>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {creatorDetails.packages.map((pkg) => (
            <Card
              key={pkg.title}
              className={`relative flex flex-col justify-between transition ${
                pkg.popular ? "border-primary shadow-md" : "hover:border-primary/50"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 right-6 bg-primary text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">{pkg.title}</CardTitle>
                <CardDescription className="mt-2 text-xs leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">{pkg.price}</span>
                  <span className="text-xs text-muted-foreground">/ video</span>
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex-col items-stretch border-t border-border pt-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>Turnaround: {pkg.turnaround}</span>
                </div>
                <Button
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full text-xs font-bold uppercase tracking-wider"
                >
                  Order Package
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Past Collaborations Footer Bar */}
      <section className="mt-16 sm:mt-20">
        <Separator className="mb-8" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2 font-semibold">
            <Camera className="size-4 text-primary" /> Supported Specs: 4K 60fps, Studio Lighting, Pro Audio
          </span>
          <span className="font-medium">
            Past brand collaborations: <strong className="text-foreground">LUMEN, VANTA, NOVA, NIKE UGC</strong>
          </span>
        </div>
      </section>
    </main>
  );
}