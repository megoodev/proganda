"use client";

import { ReactNode } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
  FaSnapchat,
  FaPinterest,
  FaReddit,
  FaDiscord,
  FaTelegram,
  FaGithub,
} from "react-icons/fa6";
import {
  LuArrowUpRight,
  LuClock,
  LuGlobe,
  LuMail,
  LuMapPin,
  LuPhone,
  LuShieldCheck,
  LuSparkles,
  LuZap,
} from "react-icons/lu";

import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact-form";
import { ConsultationSection } from "@/components/consultation-section";
import { ContactFAQ } from "@/components/contact-faq";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader } from "@/components/ui/card";

export type SocialLink = {
  platform: string;
  url: string;
  sortOrder?: number;
  id?: string;
  title?: string | null;
  icon?: string | null;
};

// Loose shape so the Prisma result (null fields) is accepted directly
export type ContactSettings = {
  email?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  socialLinks?: SocialLink[];
};

export type ContactDictionary = {
  // Header
  eyebrow: string;
  title: string;
  description: string;
  responseTime: string;
  ndaProtected: string;

  // Direct channels & contact info
  directChannelsTitle: string;
  directChannelsSubtitle: string;
  whatsapp: string;
  whatsappAction: string;
  whatsappPrefill: string;
  phone: string;
  callStudioDesk: string;
  dedicatedRouting: string;
  emailBrief: string;
  emailCreator: string;
  emailLabel: string;
  socialTitle: string;
  officeHoursTitle: string;
  officeHours: string;
  officeLocationsTitle: string;
  officeLocations: string;

  // Form labels
  formTitle: string;
  messageFormTitle: string;
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  interest: string;
  interestPlaceholder: string;
  options: string[];
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;

  // Consultation
  consultationEyebrow: string;
  consultationTitle: string;
  consultationSubtitle: string;
  consultationBadge: string;
  track1Title: string;
  track1Desc: string;
  track2Title: string;
  track2Desc: string;
  track3Title: string;
  track3Desc: string;
  consultationName: string;
  consultationEmail: string;
  consultationType: string;
  consultationDate: string;
  consultationNotes: string;
  consultationSubmit: string;
  consultationSuccess: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqs: Array<{ q: string; a: string }>;
};

export interface ContactClientProps {
  settings?: ContactSettings | null;
  socialLinks?: SocialLink[];
  back: string;
  dict: ContactDictionary;
}

const BASE_ICON_CLASS = "size-[18px]";

// Map icons directly to their brand colors
const ICON_MAP: Record<string, ReactNode> = {
  instagram: <FaInstagram className={`${BASE_ICON_CLASS} text-[#E4405F]`} />,
  tiktok: <FaTiktok className={`${BASE_ICON_CLASS} text-foreground`} />,
  whatsapp: <FaWhatsapp className={`${BASE_ICON_CLASS} text-[#25D366]`} />,
  facebook: <FaFacebook className={`${BASE_ICON_CLASS} text-[#1877F2]`} />,
  linkedin: <FaLinkedin className={`${BASE_ICON_CLASS} text-[#0A66C2]`} />,
  youtube: <FaYoutube className={`${BASE_ICON_CLASS} text-[#FF0000]`} />,
  twitter: <FaXTwitter className={`${BASE_ICON_CLASS} text-foreground`} />,
  x: <FaXTwitter className={`${BASE_ICON_CLASS} text-foreground`} />,
  snapchat: <FaSnapchat className={`${BASE_ICON_CLASS} text-[#FFFC00]`} />,
  pinterest: <FaPinterest className={`${BASE_ICON_CLASS} text-[#E60023]`} />,
  reddit: <FaReddit className={`${BASE_ICON_CLASS} text-[#FF4500]`} />,
  discord: <FaDiscord className={`${BASE_ICON_CLASS} text-[#5865F2]`} />,
  telegram: <FaTelegram className={`${BASE_ICON_CLASS} text-[#24A1DE]`} />,
  github: <FaGithub className={`${BASE_ICON_CLASS} text-foreground`} />,
  globe: <LuGlobe className={`${BASE_ICON_CLASS} text-primary`} />,
};

function getSocialIcon(platform: string, iconName?: string | null) {
  // 1. Try matching by explicit icon name
  if (iconName) {
    const key = iconName.toLowerCase().trim();
    if (ICON_MAP[key]) return ICON_MAP[key];
  }

  // 2. Try matching by platform name
  const p = platform.toLowerCase().trim();
  if (ICON_MAP[p]) return ICON_MAP[p];

  // 3. Partial fallback matching
  if (p.includes("instagram")) return ICON_MAP.instagram;
  if (p.includes("tiktok")) return ICON_MAP.tiktok;
  if (p.includes("whatsapp")) return ICON_MAP.whatsapp;
  if (p.includes("facebook")) return ICON_MAP.facebook;
  if (p.includes("linkedin")) return ICON_MAP.linkedin;
  if (p.includes("youtube")) return ICON_MAP.youtube;
  if (p.includes("twitter") || p === "x") return ICON_MAP.twitter;

  // Default fallback
  return <LuGlobe className={`${BASE_ICON_CLASS} text-primary`} />;
}

export function ContactClient({
  settings,
  socialLinks: directSocialLinks,
  back,
  dict,
}: ContactClientProps) {
  const socialLinks = directSocialLinks ?? settings?.socialLinks ?? [];

  const rawWhatsapp = settings?.whatsapp ?? "";
  const whatsappNumber = rawWhatsapp.replace(/[^0-9]/g, "");
  const rawPhone = settings?.phone || rawWhatsapp;
  const phoneNumber = rawPhone.replace(/[^0-9]/g, "");
  const contactEmail = settings?.email ?? "";
  const emailDomain = contactEmail.split("@")[1] ?? "";
  const creatorsEmail = emailDomain ? `creators@${emailDomain}` : "";

  return (
    <main className="overflow-hidden">
      {/* 1. Header Hero */}
      <section className="relative px-5 pb-16 pt-20 lg:px-8 lg:pb-24">
        <div className="workflow-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground transition-colors hover:text-primary"
            >
              {back} <LuArrowUpRight className="size-3" />
            </Link>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {dict.eyebrow}
            </p>
            <h1 className="max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-black leading-[1.04] tracking-tight text-accent-foreground">
              {dict.title}
            </h1>
          </div>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-foreground/55 lg:pb-6">
              {dict.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <LuZap className="size-3.5" />
                {dict.responseTime}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <LuShieldCheck className="size-3.5 text-primary" />
                {dict.ndaProtected}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 2. Direct Channels */}
      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-2xl font-black uppercase tracking-tight text-accent-foreground sm:text-3xl">
              {dict.directChannelsTitle}
            </h2>
            <p className="max-w-sm text-xs text-foreground/55">
              {dict.directChannelsSubtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* WhatsApp */}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(dict.whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-[#25D366]/30 bg-[#25D366]/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366]/10"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center bg-[#25D366]/20 text-[#25D366]">
                      <FaWhatsapp size={22} />
                    </div>
                    <LuArrowUpRight className="size-4 text-foreground/30 transition-colors group-hover:text-[#25D366]" />
                  </div>
                  <h3 className="text-base font-black text-accent-foreground">
                    {dict.whatsapp}
                  </h3>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/55">
                    {rawWhatsapp}
                  </p>
                </div>
                <span className="mt-6 text-xs font-bold uppercase tracking-wider text-[#25D366]">
                  {dict.whatsappAction} →
                </span>
              </a>
            )}

            {/* Direct Phone */}
            {phoneNumber && (
              <a
                href={`tel:+${phoneNumber}`}
                className="group flex flex-col justify-between border border-primary/30 bg-primary/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center bg-primary/20 text-primary">
                      <LuPhone className="size-5" />
                    </div>
                    <LuArrowUpRight className="size-4 text-foreground/30 transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="text-base font-black text-accent-foreground">
                    {dict.phone}
                  </h3>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/55">
                    {rawPhone}
                  </p>
                </div>
                <span className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">
                  {dict.callStudioDesk} →
                </span>
              </a>
            )}

            {/* Dedicated Routing */}
            <div className="flex flex-col justify-between border border-white/10 bg-[#151515] p-6 sm:col-span-2 lg:col-span-1">
              <div>
                <div className="mb-4 flex size-10 items-center justify-center bg-white/10 text-white">
                  <LuMail className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-black text-accent-foreground">
                  {dict.dedicatedRouting}
                </h3>
                <div className="space-y-2 text-xs">
                  {contactEmail && (
                    <div>
                      <span className="block text-foreground/55">
                        {dict.emailBrief}
                      </span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  )}
                  {creatorsEmail && (
                    <div>
                      <span className="block text-foreground/55">
                        {dict.emailCreator}
                      </span>
                      <a
                        href={`mailto:${creatorsEmail}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {creatorsEmail}
                      </a>
                    </div>
                  )}
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {dict.socialTitle}
            </p>
            <div className="mt-8 grid gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link, idx) => (
                  <a
                    key={link.id ?? idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold transition-colors hover:border-primary"
                  >
                    <span className="flex items-center gap-3 capitalize text-muted-foreground hover:text-accent-foreground">
                      {getSocialIcon(link.platform, link.icon)}
                      {link.title || link.platform}
                    </span>
                    <LuArrowUpRight className="size-4 text-white/35 transition-colors group-hover:text-primary" />
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://www.instagram.com/proganda1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold transition-colors hover:border-primary"
                  >
                    <span className="flex items-center gap-3 text-muted-foreground hover:text-accent-foreground">
                      {ICON_MAP.instagram}
                      Instagram
                    </span>
                    <LuArrowUpRight className="size-4 text-white/35 transition-colors group-hover:text-primary" />
                  </a>
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold transition-colors hover:border-primary"
                  >
                    <span className="flex items-center gap-3 text-muted-foreground hover:text-accent-foreground">
                      {ICON_MAP.tiktok}
                      TikTok
                    </span>
                    <LuArrowUpRight className="size-4 text-white/35 transition-colors group-hover:text-primary" />
                  </a>
                </>
              )}
            </div>
          </div>

          <Card className="space-y-4 p-6">
            <CardHeader>
              <div className="flex items-start gap-3">
                <LuClock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    {dict.officeHoursTitle}
                  </h4>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/55">
                    {dict.officeHours}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <LuMapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    {dict.officeLocationsTitle}
                  </h4>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/55">
                    {dict.officeLocations}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </aside>

        <div>
          <div className="mb-5 flex items-center gap-2">
            <LuSparkles className="size-4 text-primary" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {dict.formTitle}
            </p>
          </div>
          <ContactForm
            labels={{
              name: dict.name,
              email: dict.emailLabel,
              company: dict.company,
              formTitle: dict.messageFormTitle,
              namePlaceholder: dict.namePlaceholder,
              companyPlaceholder: dict.companyPlaceholder,
              interest: dict.interest,
              interestPlaceholder: dict.interestPlaceholder,
              options: dict.options,
              message: dict.message,
              messagePlaceholder: dict.messagePlaceholder,
              submit: dict.submit,
              sending: dict.sending,
              success: dict.success,
              error: dict.error,
            }}
          />
        </div>
      </section>

      {/* 4. Creative Consultation Section */}
      <ConsultationSection
        labels={{
          eyebrow: dict.consultationEyebrow,
          title: dict.consultationTitle,
          subtitle: dict.consultationSubtitle,
          badge: dict.consultationBadge,
          track1Title: dict.track1Title,
          track1Desc: dict.track1Desc,
          track2Title: dict.track2Title,
          track2Desc: dict.track2Desc,
          track3Title: dict.track3Title,
          track3Desc: dict.track3Desc,
          name: dict.consultationName,
          email: dict.consultationEmail,
          type: dict.consultationType,
          date: dict.consultationDate,
          notes: dict.consultationNotes,
          submit: dict.consultationSubmit,
          success: dict.consultationSuccess,
        }}
      />

      {/* 5. FAQ Section */}
      <ContactFAQ
        title={dict.faqTitle}
        subtitle={dict.faqSubtitle}
        faqs={dict.faqs}
      />
    </main>
  );
}