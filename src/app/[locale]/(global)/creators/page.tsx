import { getTranslations } from "next-intl/server";
import { CreatorDirectory } from "@/components/creator-directory";

export default async function CreatorsPage({
  params,
}: PageProps<"/[locale]/creators">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "creators" });
  return (
    <main className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1B449A]">
        {t("eyebrow")}
      </p>
      <h1 className="max-w-3xl text-[clamp(2.8rem,10vw,6rem)] font-black leading-[.9] tracking-[-0.07em] text-accent-foreground">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {t("description")}
      </p>
      <div className="mt-14">
        <CreatorDirectory
          labels={{
            search: t("search"),
            all: t("all"),
            profile: t("profile"),
            reach: t("reach"),
            engagement: t("engagement"),
          }}
        />
      </div>
    </main>
  );
}
