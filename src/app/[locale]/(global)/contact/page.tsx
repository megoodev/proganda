import { getTranslations } from "next-intl/server";
import {
  ContactClient,
  type ContactDictionary,
} from "./_components/ContactClient";
import { getSiteSettings } from "@/features/settings/queries/get-site-settings";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [settingsData, t, common] = await Promise.all([
    getSiteSettings(),
    getTranslations({ locale, namespace: "contactPage" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  const settings = settingsData.settings;

  const dict: ContactDictionary = {
    // Header
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    responseTime: t("responseTime"),
    ndaProtected: t("ndaProtected"),

    // Direct channels
    directChannelsTitle: t("directChannelsTitle"),
    directChannelsSubtitle: t("directChannelsSubtitle"),
    whatsapp: t("whatsapp"),
    whatsappAction: t("whatsappAction"),
    whatsappPrefill: t("whatsappPrefill"),
    phone: t("phone"),
    callStudioDesk: t("callStudioDesk"),
    dedicatedRouting: t("dedicatedRouting"),
    emailBrief: t("emailBrief"),
    emailCreator: t("emailCreator"),
    emailLabel: t("emailLabel"),
    socialTitle: t("socialTitle"),
    officeHoursTitle: t("officeHoursTitle"),
    officeHours: t("officeHours"),
    officeLocationsTitle: t("officeLocationsTitle"),
    officeLocations: t("officeLocations"),

    // Form
    formTitle: t("formTitle"),
    messageFormTitle: t("messageFormTitle"),
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    company: t("company"),
    companyPlaceholder: t("companyPlaceholder"),
    interest: t("interest"),
    interestPlaceholder: t("interestPlaceholder"),
    options: t.raw("options") as string[],
    message: t("message"),
    messagePlaceholder: t("messagePlaceholder"),
    submit: t("submit"),
    sending: t("sending"),
    success: t("success"),
    error: t("error"),

    // Consultation
    consultationEyebrow: t("consultEyebrow"),
    consultationTitle: t("consultTitle"),
    consultationSubtitle: t("consultSubtitle"),
    consultationBadge: t("consultBadge"),
    track1Title: t("consultTrack1Title"),
    track1Desc: t("consultTrack1Desc"),
    track2Title: t("consultTrack2Title"),
    track2Desc: t("consultTrack2Desc"),
    track3Title: t("consultTrack3Title"),
    track3Desc: t("consultTrack3Desc"),
    consultationName: t("consultFormName"),
    consultationEmail: t("consultFormEmail"),
    consultationType: t("consultFormType"),
    consultationDate: t("consultFormDate"),
    consultationNotes: t("consultFormNotes"),
    consultationSubmit: t("consultFormSubmit"),
    consultationSuccess: t("consultFormSuccess"),

    // FAQ
    faqTitle: t("faqTitle"),
    faqSubtitle: t("faqSubtitle"),
    faqs: [1, 2, 3, 4].map((n) => ({
      q: t(`faq${n}Q`),
      a: t(`faq${n}A`),
    })),
  };

  return (
    <ContactClient
      settings={settings}
      socialLinks={settings?.socialLinks}
      back={common("back")}
      dict={dict}
    />
  );
}