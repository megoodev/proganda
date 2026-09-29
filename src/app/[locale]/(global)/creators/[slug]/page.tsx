import { notFound } from "next/navigation";
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
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop",
    reach: "5M+",
    engagement: "471K Likes",
    platforms: ["Instagram", "TikTok"],
    accent: "#3AA7FD",
  };

  const t = await getTranslations({ locale, namespace: "creators" });

  return (
    <CreatorProfileClient
      creator={creator}
      t={{
        profile: t("profile"),
      }}
    />
  );
}