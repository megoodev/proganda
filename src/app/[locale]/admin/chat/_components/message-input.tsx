"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const t = useTranslations("admin.chat");
  const [text, setText] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t border-border/70 p-3">
      <Input value={text} onChange={(event) => setText(event.target.value)} placeholder={t("inputPlaceholder")} maxLength={2000} />
      <Button type="submit" size="icon" aria-label={t("send")} disabled={!text.trim()}>
        <Send className="size-4 rtl:-scale-x-100" />
      </Button>
    </form>
  );
}
