import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { listBloggers } from "@/features/bloggers/queries/list-bloggers";
import { BloggersTable } from "./_components/bloggers-table";

export default async function BloggersPage() {
  const t = await getTranslations("admin.bloggers");
  const bloggers = await listBloggers();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <BloggersTable initialBloggers={bloggers} />
    </>
  );
}
