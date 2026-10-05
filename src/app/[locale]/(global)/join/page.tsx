import { getTranslations } from "next-intl/server";
import { ArrowUpRight, BriefcaseBusiness, IdCard, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamApplicationUrl = "https://tally.so/r/eqGAEl";
const memberIdUrl = "https://tally.so/r/eqWXQe";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "join" });

  const paths = [
    {
      title: t("creatorTitle"),
      description: t("creatorDescription"),
      cta: t("creatorCta"),
      href: "/auth/register?role=blogger",
      icon: Users,
      external: false,
    },
    {
      title: t("teamTitle"),
      description: t("teamDescription"),
      cta: t("teamCta"),
      href: teamApplicationUrl,
      icon: BriefcaseBusiness,
      external: true,
    },
    {
      title: t("idCardTitle"),
      description: t("idCardDescription"),
      cta: t("idCardCta"),
      href: memberIdUrl,
      icon: IdCard,
      external: true,
    },
    {
      title: t("brandTitle"),
      description: t("brandDescription"),
      cta: t("brandCta"),
      href: "/contact",
      icon: BriefcaseBusiness,
      external: false,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <header className="max-w-3xl">
        <Badge
          variant="outline"
          className="mb-4 border-primary/30 bg-primary/10"
        >
          {t("eyebrow")}
        </Badge>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </header>

      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        {paths.map(
          ({ title, description, cta, href, icon: Icon, external }) => {
            const content = (
              <>
                <Card className="h-full border-border/70 bg-card transition-colors hover:border-primary/50">
                  <CardHeader>
                    <Icon className="mb-3 size-6 text-primary" />
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="min-h-12 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      {cta}
                      <ArrowUpRight className="size-4 rtl:rotate-90" />
                    </span>
                  </CardContent>
                </Card>
              </>
            );

            return external ? (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {content}
              </a>
            ) : (
              <Link
                key={title}
                href={href as "/contact"}
                className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {content}
              </Link>
            );
          },
        )}
      </section>
    </main>
  );
}
