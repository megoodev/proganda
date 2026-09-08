import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  Mail,
  Play,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/10 px-5 pb-16 pt-20 lg:px-8 lg:pb-24">
        <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45 hover:text-[#ccff00]"
            >
              {common("back")} <ArrowUpRight className="size-3" />
            </Link>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
              {t("eyebrow")}
            </p>
            <h1 className="max-w-4xl text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[.84] tracking-[-0.08em]">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-white/55 lg:pb-2">
            {t("description")}
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.75fr_1.25fr] lg:px-8 lg:py-24">
        <aside className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              {t("socialTitle")}
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href="mailto:hello@proganda.studio"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00]"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-4 text-[#ff007f]" />
                  {t("emailLabel")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00]"
              >
                <span className="flex items-center gap-3">
                  <AtSign className="size-4 text-[#ff007f]" />
                  {t("instagram")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00]"
              >
                <span className="flex items-center gap-3">
                  <BriefcaseBusiness className="size-4 text-[#8a2be2]" />
                  {t("linkedin")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00]"
              >
                <span className="flex items-center gap-3">
                  <Play className="size-4 text-[#ff007f]" />
                  {t("youtube")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00]" />
              </a>
            </div>
          </div>
          <div className="border-s-2 border-[#ccff00] bg-[#151515] p-5 text-sm leading-relaxed text-white/55">
            {t("description")}
          </div>
        </aside>
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            {t("formTitle")}
          </p>
          <ContactForm
            labels={{
              name: t("name"),
              email: t("email"),
              company: t("company"),
              interest: t("interest"),
              interestPlaceholder: t("interestPlaceholder"),
              options: t.raw("options") as string[],
              message: t("message"),
              messagePlaceholder: t("messagePlaceholder"),
              submit: t("submit"),
              sending: t("sending"),
              success: t("success"),
              error: t("error"),
            }}
          />
        </div>
      </section>
    </main>
  );
}
