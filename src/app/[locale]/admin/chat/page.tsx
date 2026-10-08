import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listConversations } from "@/features/chat/queries/list-conversations";
import { ChatView } from "./_components/chat-view";

export default async function ChatPage() {
  const t = await getTranslations("admin.chat");
  const conversations = await listConversations();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <ChatView initialConversations={conversations} />
    </>
  );
}
