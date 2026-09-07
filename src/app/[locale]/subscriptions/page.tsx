import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { validateSession } from "@/lib/auth";
import { serviceTiers } from "@/lib/data";

export default async function SubscriptionsPage({
  params,
}: PageProps<"/[locale]/subscriptions">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "subscriptions" });
  const session = await validateSession();
  const role =
    session.authorized &&
    (session.role === "brand" || session.role === "creator")
      ? session.role
      : null;
  if (role === "brand")
    return (
      <AccountView
        title={t("brandTitle")}
        icon={CreditCard}
        items={["Full Management", "8 campaign credits", "Active code: BETA15"]}
        action={t("brandCta")}
      />
    );
  if (role === "creator")
    return (
      <AccountView
        title={t("creatorTitle")}
        icon={BadgeCheck}
        items={[
          t("pro"),
          "2.4M monthly views",
          t("perks"),
          "Priority booking active",
        ]}
        action={t("creatorCta")}
      />
    );
  return (
    <main className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
        {t("eyebrow")}
      </p>
      <h1 className="max-w-4xl text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">
        {t("title")}
      </h1>
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <section className="border border-[#ccff00]/40 bg-[#ccff00]/[.05] p-7">
          <Sparkles className="size-7 text-[#ccff00]" />
          <h2 className="mt-14 text-4xl font-black">{t("brandTitle")}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            {t("brandDescription")}
          </p>
          <div className="mt-8 grid gap-3">
            {serviceTiers.map((tier) => (
              <div key={tier.id} className="border border-white/10 p-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold">{tier.name}</span>
                  <span className="text-xs text-[#ccff00]">
                    {tier.offer.split("+")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/auth/register?role=brand"
            className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] px-5 py-3 text-sm font-bold text-black"
          >
            {t("brandCta")} <ArrowRight className="size-4" />
          </Link>
        </section>
        <section className="border border-[#8a2be2]/50 bg-[#8a2be2]/[.06] p-7">
          <BarChart3 className="size-7 text-[#ff007f]" />
          <h2 className="mt-14 text-4xl font-black">{t("creatorTitle")}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            {t("creatorDescription")}
          </p>
          <div className="mt-8 grid gap-3">
            <div className="border border-white/10 p-4">
              <span className="font-bold">{t("free")}</span>
              <p className="mt-2 text-sm text-white/45">
                Roster access + campaign matching
              </p>
            </div>
            <div className="border border-[#ff007f]/50 p-4">
              <span className="font-bold">{t("pro")}</span>
              <p className="mt-2 text-sm text-white/45">
                {t("perks")} + priority booking
              </p>
            </div>
          </div>
          <Link
            href="/auth/register?role=creator"
            className="mt-8 inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-bold hover:border-[#ff007f]"
          >
            {t("creatorCta")} <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}

function AccountView({
  title,
  icon: Icon,
  items,
  action,
}: {
  title: string;
  icon: typeof CreditCard;
  items: string[];
  action: string;
}) {
  return (
    <main className="mx-auto max-w-5xl px-5 py-24 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
        Account overview
      </p>
      <h1 className="mt-4 text-6xl font-black tracking-[-0.07em]">{title}</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item} className="border border-white/10 bg-white/[.03] p-6">
            <Icon className="size-6 text-[#ccff00]" />
            <p className="mt-12 text-xl font-bold">{item}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/35">
              {index === 0
                ? "Current status"
                : index === 1
                  ? "Live metric"
                  : "Access"}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-5 py-3 text-sm font-bold text-black">
        {action} <CalendarDays className="size-4" />
      </button>
    </main>
  );
}
