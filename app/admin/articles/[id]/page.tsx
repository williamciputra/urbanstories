import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import NewArticleForm from "@/components/admin/articles/NewArticleForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Article
        </h1>

        <p className="mt-2 text-gray-500">
          Update your article.
        </p>
      </div>

      <NewArticleForm
        mode="edit"
        initialData={article}
      />
    </main>
  );
}