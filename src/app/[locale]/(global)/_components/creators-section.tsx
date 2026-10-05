import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedCreators } from "@/features/creators/queries/get-featured-creators";
import { CreatorCarousel } from "./creator-carousel";

export async function CreatorsSection() {
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const creators = await getFeaturedCreators();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge
            variant="outline"
            className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Sparkles className="size-3.5" />
            {t("creatorsEyebrow")}
          </Badge>
          <h2 className="text-3xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl">
            {t("creatorsTitle")}
          </h2>
        </div>

        <Button
          asChild
          variant="ghost"
          className="group gap-2 font-bold text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/creators">
            {common("explore")}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Button>
      </div>

      <CreatorCarousel creators={creators} />
    </section>
  );
}
