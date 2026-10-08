"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { openConversation } from "@/features/chat/actions/open-conversation";
import { sendAdminMessage } from "@/features/chat/actions/send-admin-message";
import type { Conversation } from "@/features/chat/schemas";
import { ConversationList } from "./conversation-list";
import { MessageThread } from "./message-thread";

export function ChatView({ initialConversations }: { initialConversations: Conversation[] }) {
  const t = useTranslations("admin.chat");
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = conversations.find((item) => item.id === activeId) ?? null;

  const open = async (id: string) => {
    setActiveId(id);
    const result = await openConversation({ conversationId: id });
    if (!result.ok) return;
    setConversations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: 0, messages: result.data } : item)),
    );
  };

  const send = async (id: string, text: string) => {
    const result = await sendAdminMessage({ conversationId: id, text });
    if (!result.ok) return false;
    setConversations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, messages: [...item.messages, result.data] } : item)),
    );
    return true;
  };

  return (
    <div className="grid h-[calc(100dvh-11rem)] min-h-[26rem] overflow-hidden rounded-xl border border-border/70 bg-card md:grid-cols-[18rem_1fr]">
      <div className={cn("border-e border-border/70", active ? "hidden md:block" : "block")}>
        <ConversationList conversations={conversations} activeId={activeId} onSelect={open} />
      </div>
      <div className={cn("min-h-0", active ? "flex" : "hidden md:flex")}>
        {active ? (
          <MessageThread conversation={active} onSend={(text) => send(active.id, text)} onBack={() => setActiveId(null)} />
        ) : (
          <p className="m-auto text-sm text-muted-foreground">{t("selectPrompt")}</p>
        )}
      </div>
    </div>
  );
}
