import { HomePage } from "@/components/home-page";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return <HomePage locale={locale as "en" | "ar"} />;
}
