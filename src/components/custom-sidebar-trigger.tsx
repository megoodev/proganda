import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustomSidebarTrigger() {
  const t = useTranslations("dashboard");
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <SidebarTrigger aria-label={t("toggleSidebar")} />
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1" side="right">
        {t("toggleSidebar")}{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>b</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}
