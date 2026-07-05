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

    const { data: articleTags } = await supabase
        .from("article_tags")
        .select(`
      tags (
        name
      )
    `)
        .eq("article_id", id);

    const initialData = {
        ...article,
        tags:
            articleTags?.map(
                (item: any) => item.tags.name
            ) ?? [],
    };

    return (
        <main className="mx-auto w-full max-w-6xl px-8 py-5">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold">
                    Edit Article
                </h1>

                <p className="mt-1 text-sm text-neutral-500">
                    Update your article.
                </p>
            </div>

            <NewArticleForm
                mode="edit"
                initialData={initialData}
            />
        </main>
    );
}