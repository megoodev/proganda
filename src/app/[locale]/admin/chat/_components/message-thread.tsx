"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/features/chat/schemas";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";

type Props = { conversation: Conversation; onSend: (text: string) => void; onBack: () => void };

export function MessageThread({ conversation, onSend, onBack }: Props) {
  const t = useTranslations("admin.chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [conversation.messages.length, conversation.id]);

  return (
    <div className="flex min-h-0 w-full flex-col">
      <div className="flex items-center gap-3 border-b border-border/70 p-3">
        <Button variant="ghost" size="icon" className="size-8 md:hidden" onClick={onBack} aria-label={t("back")}>
          <ArrowLeft className="size-4 rtl:rotate-180" />
        </Button>
        <div>
          <p className="text-sm font-semibold">{conversation.bloggerName}</p>
          <p className="text-xs text-muted-foreground">{t("managedBy", { name: conversation.managerName })}</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
