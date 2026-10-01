import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { creators } from "@/lib/data";
import { HomeCreatorCarousel } from "@/app/[locale]/(global)/_components/home-creator-carousel";
import { HomeHeroCarousel } from "@/app/[locale]/(global)/_components/home-hero-carousel";
import { WorkflowSection, type PipelineStep } from "./WorkflowSection";

// Importing shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IntegrationsSection } from "./IntegrationsSection";

export async function HomePage({ locale }: { locale: "en" | "ar" }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  const pipelineSteps = t.raw("pipelineSteps") as PipelineStep[];

  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <HomeHeroCarousel
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        primaryCta={t("primaryCta")}
        secondaryCta={t("secondaryCta")}
      />

      <Separator />

      {/* 2. STATS BANNER */}
      <div className="relative border-y border-primary/20 bg-primary/10 py-4 text-primary backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs font-black uppercase tracking-widest sm:px-8">
          <div className="flex items-center gap-2">
            <Zap className="size-4 animate-pulse text-primary" />
            <span>12.4B+ {t("views")}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="size-1.5 rounded-full bg-primary" />
            <span>{t("campaignsShipped")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span>{t("inHouseProduction")}</span>
          </div>
        </div>
      </div>

      {/* 3. CREATORS SHOWCASE SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className="mb-3 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-3.5" />
              {t("creatorsEyebrow")}
            </Badge>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              {t("creatorsTitle")}
            </h2>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group gap-2 font-bold text-primary hover:bg-primary/10 hover:text-primary"
          >
            <Link href="/creators">
              {common("explore")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
        <HomeCreatorCarousel
          creators={creators}
          viewsLabel={t("views")}
          locale={locale}
        />
      </section>

      <Separator />

      {/* 4. WORKFLOW PIPELINE SECTION */}
      <WorkflowSection
        eyebrow={t("workflowEyebrow")}
        title={t("workflowTitle")}
        description={t("workflowDescription")}
        aboutCta={t("aboutCta")}
        reelLabel={t("reel")}
        livePipelineLabel={t("livePipeline")}
        studioLiveLabel={t("studioLive")}
        teamLabel={t("oneSharpTeam")}
        productionLabel={t("inHouseProduction")}
        pipelineSteps={pipelineSteps}
      />

      <Separator />

      {/* 5. INTEGRATIONS & HUB SECTION */}
      <IntegrationsSection t={t} />
    </main>
  );
}

// old intgeration section

// <section className="relative px-6 py-20 lg:px-8 lg:py-28">
//   <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
//     {/* Left Text */}
//     <div className="lg:col-span-5">
//       <Badge
//         variant="outline"
//         className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
//       >
//         <Zap className="size-3.5" />
//         {t("integrationsEyebrow")}
//       </Badge>

//       <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
//         {t("integrationsTitle")}
//       </h2>

//       <p className="mt-6 text-base leading-relaxed text-muted-foreground">
//         {t("integrationsDescription")}
//       </p>

//       <Button
//         asChild
//         variant="link"
//         className="group mt-6 p-0 font-bold text-primary hover:no-underline"
//       >
//         <Link href="/services" className="flex items-center gap-2">
//           {t("integrationsCta")}
//           <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
//         </Link>
//       </Button>
//     </div>

//     {/* Right Bento Grid */}
//     <div className="lg:col-span-7">
//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//         {/* Central Hub Logo Card */}
//         <Card className="col-span-2 row-span-2 border-primary/30 bg-linear-to-br from-card to-muted/40 p-6 shadow-xl backdrop-blur-xl">
//           <CardContent className="flex h-full flex-col items-center justify-center p-0 text-center">
//             <div className="relative flex size-24 items-center justify-center rounded-2xl bg-accent p-3 shadow-inner">
//               <Image
//                 src="/assets/logos/IMG_1531.PNG"
//                 alt="ProGanda"
//                 width={96}
//                 height={96}
//                 className="size-full object-contain dark:invert"
//               />
//             </div>
//             <p className="mt-4 text-xs font-black uppercase tracking-widest text-primary">
//               PROGANDA / HUB
//             </p>
//           </CardContent>
//         </Card>

//         {/* Partner Integration Cards */}
//         {["IMG_0092.JPG.jpeg", "IMG_9506.JPG.jpeg", "IMG_9508.PNG"].map(
//           (logo, index) => (
//             <Card
//               key={logo}
//               className="group flex min-h-[100px] items-center justify-center border-border/60 bg-card/60 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-accent/40 hover:shadow-md"
//             >
//               <CardContent className="relative flex size-full items-center justify-center p-0">
//                 <Image
//                   src={`/assets/logos/${logo}`}
//                   alt={`Integration ${index + 1}`}
//                   width={120}
//                   height={48}
//                   className="max-h-12 w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 dark:invert"
//                 />
//               </CardContent>
//             </Card>
//           )
//         )}

//         {/* Special Badge Box */}
//         <Card className="col-span-2 border-primary/30 bg-primary/10 p-4 shadow-sm sm:col-span-1">
//           <CardContent className="flex h-full items-center justify-center p-0 text-center text-[10px] font-black uppercase tracking-wider text-primary">
//             Strategy + Creators + Production
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   </div>
// </section>
