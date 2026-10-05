"use client";

import { useLocale, useTranslations } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Conversation } from "@/features/chat/schemas";

type Props = { conversations: Conversation[]; activeId: string | null; onSelect: (id: string) => void };

export function ConversationList({ conversations, activeId, onSelect }: Props) {
  const t = useTranslations("admin.chat");
  const locale = useLocale();

  if (conversations.length === 0) {
    return <p className="p-6 text-center text-sm text-muted-foreground">{t("noConversations")}</p>;
  }

  return (
    <ul className="h-full divide-y divide-border/60 overflow-y-auto">
      {conversations.map((conversation) => {
        const last = conversation.messages.at(-1);
        return (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={cn("flex w-full items-center gap-3 p-3 text-start transition-colors hover:bg-accent/50", conversation.id === activeId && "bg-primary/10")}
            >
              <Avatar className="size-10">
                <AvatarFallback>{conversation.bloggerName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{conversation.bloggerName}</p>
                  {last && <span className="shrink-0 text-[10px] text-muted-foreground">{formatDate(last.sentAt, locale)}</span>}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-muted-foreground">{last?.text}</p>
                  {conversation.unread > 0 && <Badge className="h-5 min-w-5 justify-center px-1.5">{conversation.unread}</Badge>}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
