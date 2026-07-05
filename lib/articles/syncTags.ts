import { SupabaseClient } from "@supabase/supabase-js";

export async function syncTags(
    supabase: SupabaseClient,
    articleId: string,
    tags: string[]
) {
    await supabase
        .from("article_tags")
        .delete()
        .eq("article_id", articleId);

    for (const tagName of tags) {
        const name = tagName.trim();

        if (!name) continue;

        const slug = name
            .toLowerCase()
            .replace(/\s+/g, "-");

        let { data: tag } = await supabase
            .from("tags")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

        if (!tag) {
            const { data: created, error } = await supabase
                .from("tags")
                .insert({
                    name,
                    slug,
                })
                .select("id")
                .single();

            if (error) {
                console.error("CREATE TAG ERROR:", error);

                throw error;
            }

            if (!created) {
                throw new Error("Tag was not created.");
            }

            tag = created;
        }

        await supabase
            .from("article_tags")
            .insert({
                article_id: articleId,
                tag_id: tag.id,
            });
    }
}