import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type Props = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
};

export function HeroSlideDots({ count, active, onSelect }: Props) {
  const t = useTranslations("home");

  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: count }, (_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(index)}
          aria-label={t("selectSlide", { number: index + 1 })}
          aria-current={index === active}
          className={`h-1.5 overflow-hidden rounded-full p-0 transition-all duration-300 ${
            index === active ? "bg-primary" : "bg-muted hover:bg-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}
