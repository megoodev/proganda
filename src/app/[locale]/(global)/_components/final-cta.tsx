import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function FinalCta() {
  const t = await getTranslations("home");

  return (
    <section className="px-6 py-20 text-center lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl">
          {t("finalCtaTitle")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("finalCtaDescription")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-xl px-7 font-semibold">
            <Link href="/signup?type=blogger">{t("finalCtaBlogger")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-7">
            <Link href="/start-project">{t("finalCtaBrand")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
