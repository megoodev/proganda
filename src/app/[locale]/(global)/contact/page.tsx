import { getTranslations } from "next-intl/server";
import { ContactClient } from "./_components/ContactClient";

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
    <ContactClient
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      formTitle={t("formTitle")}
      messageFormTitle={t("messageFormTitle")}
      namePlaceholder={t("namePlaceholder")}
      companyPlaceholder={t("companyPlaceholder")}
      name={t("name")}
      email={t("email")}
      company={t("company")}
      interest={t("interest")}
      interestPlaceholder={t("interestPlaceholder")}
      options={t.raw("options") as string[]}
      message={t("message")}
      messagePlaceholder={t("messagePlaceholder")}
      submit={t("submit")}
      sending={t("sending")}
      success={t("success")}
      error={t("error")}
      socialTitle={t("socialTitle")}
      whatsapp={t("whatsapp")}
      whatsappDesc={t("whatsappDesc")}
      whatsappAction={t("whatsappAction")}
      whatsappPrefill={t("whatsappPrefill")}
      phone={t("phone")}
      responseTime={t("responseTime")}
      ndaProtected={t("ndaProtected")}
      dedicatedRouting={t("dedicatedRouting")}
      callStudioDesk={t("callStudioDesk")}
      emailBrief={t("emailBrief")}
      emailCreator={t("emailCreator")}
      officeHoursTitle={t("officeHoursTitle")}
      officeHours={t("officeHours")}
      officeLocationsTitle={t("officeLocationsTitle")}
      officeLocations={t("officeLocations")}
      directChannelsTitle={t("directChannelsTitle")}
      directChannelsSubtitle={t("directChannelsSubtitle")}
      consultEyebrow={t("consultEyebrow")}
      consultTitle={t("consultTitle")}
      consultSubtitle={t("consultSubtitle")}
      consultBadge={t("consultBadge")}
      consultTrack1Title={t("consultTrack1Title")}
      consultTrack1Desc={t("consultTrack1Desc")}
      consultTrack2Title={t("consultTrack2Title")}
      consultTrack2Desc={t("consultTrack2Desc")}
      consultTrack3Title={t("consultTrack3Title")}
      consultTrack3Desc={t("consultTrack3Desc")}
      consultFormName={t("consultFormName")}
      consultFormEmail={t("consultFormEmail")}
      consultFormType={t("consultFormType")}
      consultFormDate={t("consultFormDate")}
      consultFormNotes={t("consultFormNotes")}
      consultFormSubmit={t("consultFormSubmit")}
      consultFormSuccess={t("consultFormSuccess")}
      faqTitle={t("faqTitle")}
      faqSubtitle={t("faqSubtitle")}
      faqs={faqs}
      back={common("back")}
    />
  );
}
