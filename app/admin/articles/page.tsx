import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import ArticleTable from "@/components/admin/articles/ArticleTable";

type Article = {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;

  authors: {
    name: string;
  }[];

  categories: {
    name: string;
  }[];
};

export default async function ArticlesPage() {
  const supabase = await createClient();

  const { data = [] } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      status,
      updated_at,
      authors:author_id(name),
      categories:category_id(name)
    `)
    .order("updated_at", {
      ascending: false,
    });

  const articles = (data ?? []) as unknown as Article[];

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Articles
        </h1>

        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          + New Article
        </Link>
      </div>

      <ArticleTable articles={articles} />
    </main>
  );
}