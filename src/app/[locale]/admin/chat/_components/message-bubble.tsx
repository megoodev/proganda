import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/format";
import type { ChatMessage } from "@/features/chat/schemas";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const locale = useLocale();
  const mine = message.from === "admin";

  return (
    <div className={cn("max-w-[80%] rounded-2xl px-3.5 py-2 text-sm", mine ? "self-end bg-primary text-primary-foreground" : "self-start bg-muted text-foreground")}>
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
      <p className={cn("mt-1 text-[10px]", mine ? "text-primary-foreground/70" : "text-muted-foreground")}>{formatTime(message.sentAt, locale)}</p>
    </div>
  );
}
