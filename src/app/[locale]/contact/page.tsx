import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact-form";
import { ConsultationSection } from "@/components/consultation-section";
import { ContactFAQ } from "@/components/contact-faq";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  WhatsappIcon,
  TelegramIcon,
  XTwitterIcon,
} from "@/components/SocialLinks";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const common = await getTranslations({ locale, namespace: "common" });

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <main className="overflow-hidden">
      {/* 1. Header Hero */}
      <section className="relative border-b border-white/10 px-5 pb-16 pt-20 lg:px-8 lg:pb-24">
        <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45 hover:text-[#ccff00] transition-colors"
            >
              {common("back")} <ArrowUpRight className="size-3" />
            </Link>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff007f]">
              {t("eyebrow")}
            </p>
            <h1 className="max-w-4xl text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[.84] tracking-[-0.08em] text-white">
              {t("title")}
            </h1>
          </div>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-white/55 lg:pb-6">
              {t("description")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ccff00]">
                <Zap className="size-3.5" />
                {t("responseTime")}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/70">
                <ShieldCheck className="size-3.5 text-[#ff007f]" />
                NDA Protected Briefs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Channels & Fast Track Grid (روابط التواصل المباشر) */}
      <section className="border-b border-white/10 bg-[#0f0f0f] py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-2">
                {t("directChannelsTitle")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Connect Directly With Producers
              </h2>
            </div>
            <p className="text-xs text-white/50 max-w-sm">
              {t("directChannelsSubtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/966501234567?text=Hello%20ProGanda%2C%20I%20would%20like%20to%20inquire%20about%20a%20campaign%20or%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[#25D366]/30 bg-[#25D366]/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center bg-[#25D366]/20 text-[#25D366]">
                    <WhatsappIcon size={22} />
                  </div>
                  <ArrowUpRight className="size-4 text-white/30 group-hover:text-[#25D366] transition-colors" />
                </div>
                <h3 className="text-base font-black text-white">{t("whatsapp")}</h3>
                <p className="mt-1 text-xs text-white/50 leading-relaxed">
                  {t("whatsappDesc")}
                </p>
              </div>
              <span className="mt-6 text-xs font-bold uppercase tracking-wider text-[#25D366]">
                {t("whatsappAction")} →
              </span>
            </a>

            {/* Direct Phone */}
            <a
              href="tel:+966501234567"
              className="group flex flex-col justify-between border border-[#ccff00]/30 bg-[#ccff00]/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#ccff00] hover:bg-[#ccff00]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center bg-[#ccff00]/20 text-[#ccff00]">
                    <Phone className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-white/30 group-hover:text-[#ccff00] transition-colors" />
                </div>
                <h3 className="text-base font-black text-white">{t("phone")}</h3>
                <p className="mt-1 text-xs font-mono text-[#ccff00]">
                  {t("phoneNumber")}
                </p>
              </div>
              <span className="mt-6 text-xs font-bold uppercase tracking-wider text-[#ccff00]">
                Call Studio Desk →
              </span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/proganda_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[#229ED9]/30 bg-[#229ED9]/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#229ED9] hover:bg-[#229ED9]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-10 items-center justify-center bg-[#229ED9]/20 text-[#229ED9]">
                    <TelegramIcon size={22} />
                  </div>
                  <ArrowUpRight className="size-4 text-white/30 group-hover:text-[#229ED9] transition-colors" />
                </div>
                <h3 className="text-base font-black text-white">{t("telegram")}</h3>
                <p className="mt-1 text-xs text-white/50 leading-relaxed">
                  {t("telegramDesc")}
                </p>
              </div>
              <span className="mt-6 text-xs font-bold uppercase tracking-wider text-[#229ED9]">
                {t("telegramAction")} →
              </span>
            </a>

            {/* Studio Email Routing */}
            <div className="flex flex-col justify-between border border-white/10 bg-[#151515] p-6">
              <div>
                <div className="flex size-10 items-center justify-center bg-white/10 text-white mb-4">
                  <Mail className="size-5 text-[#ff007f]" />
                </div>
                <h3 className="text-base font-black text-white mb-2">Dedicated Routing</h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-white/40 block">{t("emailBrief")}</span>
                    <a href="mailto:brief@proganda.studio" className="font-mono text-[#ccff00] hover:underline">
                      brief@proganda.studio
                    </a>
                  </div>
                  <div>
                    <span className="text-white/40 block">{t("emailCreator")}</span>
                    <a href="mailto:creators@proganda.studio" className="font-mono text-[#ff007f] hover:underline">
                      creators@proganda.studio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Send Brief & Form Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
        <aside className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              {t("socialTitle")}
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <InstagramIcon size={18} className="text-[#ff007f]" />
                  {t("instagram")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00] transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <LinkedinIcon size={18} className="text-[#8a2be2]" />
                  {t("linkedin")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00] transition-colors" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <YoutubeIcon size={18} className="text-[#ff007f]" />
                  {t("youtube")}
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00] transition-colors" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold hover:border-[#ccff00] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <XTwitterIcon size={18} className="text-white" />
                  X (Twitter)
                </span>
                <ArrowUpRight className="size-4 text-white/35 group-hover:text-[#ccff00] transition-colors" />
              </a>
            </div>
          </div>

          {/* Working Hours & Locations Card */}
          <div className="space-y-4 border border-white/10 bg-[#141414] p-6">
            <div className="flex items-start gap-3">
              <Clock className="size-4 text-[#ccff00] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {t("officeHoursTitle")}
                </h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed font-mono">
                  {t("officeHours")}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-start gap-3">
              <MapPin className="size-4 text-[#ff007f] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {t("officeLocationsTitle")}
                </h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed font-mono">
                  {t("officeLocations")}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="size-4 text-[#ccff00]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              {t("formTitle")}
            </p>
          </div>
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

      {/* 4. قسم الاستشارات الإبداعية (Consultation Section) */}
      <ConsultationSection
        labels={{
          eyebrow: t("consultEyebrow"),
          title: t("consultTitle"),
          subtitle: t("consultSubtitle"),
          badge: t("consultBadge"),
          track1Title: t("consultTrack1Title"),
          track1Desc: t("consultTrack1Desc"),
          track2Title: t("consultTrack2Title"),
          track2Desc: t("consultTrack2Desc"),
          track3Title: t("consultTrack3Title"),
          track3Desc: t("consultTrack3Desc"),
          name: t("consultFormName"),
          email: t("consultFormEmail"),
          type: t("consultFormType"),
          date: t("consultFormDate"),
          notes: t("consultFormNotes"),
          submit: t("consultFormSubmit"),
          success: t("consultFormSuccess"),
        }}
      />

      {/* 5. FAQ Section */}
      <ContactFAQ
        title={t("faqTitle")}
        subtitle={t("faqSubtitle")}
        faqs={faqs}
      />
    </main>
  );
}
