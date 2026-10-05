import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { getBloggers } from "@/features/bloggers/queries/get-bloggers";
import { BloggersTable } from "./_components/bloggers-table";

export default async function BloggersPage() {
  const t = await getTranslations("admin.bloggers");
  const bloggers = await getBloggers();

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />
      <BloggersTable initialBloggers={bloggers} />
    </>
  );
}
