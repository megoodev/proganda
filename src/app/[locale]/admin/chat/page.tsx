import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getConversations } from "@/features/chat/queries/get-conversations";
import { ChatView } from "./_components/chat-view";

export default async function ChatPage() {
  const t = await getTranslations("admin.chat");
  const conversations = await getConversations();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <ChatView initialConversations={conversations} />
    </>
  );
}
