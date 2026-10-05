import { getTranslations } from "next-intl/server";
import { Handshake, Headset, Megaphone, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const icons = [Handshake, Megaphone, TrendingUp, Headset];

type Item = { title: string; description: string };

export async function WhyJoinSection() {
  const t = await getTranslations("home");
  const items = t.raw("whyJoinItems") as Item[];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-black tracking-tight text-foreground rtl:leading-snug sm:text-5xl">
          {t("whyJoinTitle")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t("whyJoinDescription")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card key={item.title} className="border-border/60 bg-card/60">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
