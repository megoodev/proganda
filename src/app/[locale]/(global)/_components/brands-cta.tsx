import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function BrandsCta() {
  const t = await getTranslations("home");

  return (
    <section className="border-y border-primary/20 bg-primary/5 px-6 py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-black text-foreground rtl:leading-snug sm:text-3xl">
            {t("brandsCtaTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("brandsCtaDescription")}
          </p>
        </div>
        <Button asChild size="lg" className="group shrink-0 rounded-xl px-7 font-bold">
          <Link href="/start-project" className="flex items-center gap-2">
            {t("brandsCtaButton")}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
