import { Sparkles } from "lucide-react";
import { CreatorDirectory } from "@/components/creator-directory";

// Importing shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CreatorsClientProps {
  eyebrow: string;
  title: string;
  description: string;
  search: string;
  all: string;
  profile: string;
  reach: string;
  engagement: string;
}

export function CreatorsClient({
  eyebrow,
  title,
  description,
  search,
  all,
  profile,
  reach,
  engagement,
}: CreatorsClientProps) {
  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl">
          <Badge 
            variant="outline" 
            className="mb-4 gap-2 border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Sparkles className="size-3.5" />
            {eyebrow}
          </Badge>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.08]">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>
      </section>

      <Separator />

      {/* DIRECTORY SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <CreatorDirectory
          labels={{
            search,
            all,
            profile,
            reach,
            engagement,
          }}
        />
      </section>

    </main>
  );
}