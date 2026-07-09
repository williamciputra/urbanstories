import { createClient } from "@/lib/supabase/server";
import { getCategoryName } from "@/lib/taxonomy/categories";
import { getSubcategoryName } from "@/lib/taxonomy/subcategories";

export type HomepageArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  published_at: string;
  is_top_story: boolean;

  authors: {
    id: string;
    name: string;
  } | null;

  categories: {
    id: string;
    name: string;
  } | null;

  subcategories: {
    id: string;
    name: string;
  } | null;

  media: {
    id: string;
    path: string;
    alt_text: string | null;
    title: string | null;
  } | null;
};

export type PublicArticle = HomepageArticle & {
  tags: string[];
};

const ARTICLE_SELECT = `
  id,
  title,
  slug,
  excerpt,
  content,
  status,
  published_at,
  is_top_story,

  authors:author_id (
    id,
    name
  ),

  categories:category_id (
    id,
    name
  ),

  subcategories:subcategory_id (
    id,
    name
  ),

  media:cover_image_id (
    id,
    path,
    alt_text,
    title
  )
`;

export async function getTopStory(): Promise<HomepageArticle | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("is_top_story", true)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as HomepageArticle | null;
}

export async function getHomepageSource(): Promise<
  HomepageArticle[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getLatestHeadlines(): Promise<HomepageArticle[]> {
  const supabase = await createClient();

  // Ambil ID kategori Lifestyle & Explore
  const { data: excludedCategories } = await supabase
    .from("categories")
    .select("id")
    .in("name", ["Lifestyle", "Explore"]);

  const excludedIds =
    excludedCategories?.map((c) => c.id) ?? [];

  let query = supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("is_top_story", false)
    .order("published_at", {
      ascending: false,
    });

  if (excludedIds.length) {
    query = query.not(
      "category_id",
      "in",
      `(${excludedIds.join(",")})`
    );
  }

  const { data, error } = await query.limit(4);

  if (error) throw error;

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getLatestArticles(): Promise<HomepageArticle[]> {
  const supabase = await createClient();

  // kategori yang tampil di section sendiri
  const { data: excludedCategories } = await supabase
    .from("categories")
    .select("id")
    .in("name", ["Lifestyle", "Explore"]);

  const excludedIds =
    excludedCategories?.map((c) => c.id) ?? [];

  let query = supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("is_top_story", false)
    .order("published_at", {
      ascending: false,
    });

  if (excludedIds.length) {
    query = query.not(
      "category_id",
      "in",
      `(${excludedIds.join(",")})`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  return ((data ?? []).slice(4, 19)) as unknown as HomepageArticle[];
}

export async function getArticleBySlug(
  slug: string
): Promise<PublicArticle | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(`
      ${ARTICLE_SELECT},

      article_tags (
        tags (
          name
        )
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    return null;
  }

  return {
    ...(data as unknown as HomepageArticle),

    tags:
      data.article_tags?.flatMap(
        (item: any) => {
          if (Array.isArray(item.tags)) {
            return item.tags.map(
              (tag: any) => tag.name
            );
          }

          return item.tags?.name
            ? [item.tags.name]
            : [];
        }
      ) ?? [],
  };
}

export async function getArticlesByCategory(
  category: string
): Promise<HomepageArticle[]> {
  const categoryName =
    getCategoryName(category) ?? category;

  const supabase = await createClient();

  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .single();

  if (!categoryData) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("category_id", categoryData.id)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getArticlesBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Promise<HomepageArticle[]> {
  const categoryName =
    getCategoryName(categorySlug);

  if (!categoryName) {
    return [];
  }

  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .single();

  if (!category) {
    return [];
  }

  const subcategoryName =
    getSubcategoryName(
      categorySlug,
      subcategorySlug
    );

  if (!subcategoryName) {
    return [];
  }

  const { data: subcategory } =
    await supabase
      .from("subcategories")
      .select("id")
      .eq("category_id", category.id)
      .eq("name", subcategoryName)
      .single();

  if (!subcategory) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("category_id", category.id)
    .eq("subcategory_id", subcategory.id)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getRelatedArticles(
  currentSlug: string,
  tags: string[]
): Promise<HomepageArticle[]> {
  if (!tags.length) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(`
      ${ARTICLE_SELECT},

      article_tags (
        tags (
          name
        )
      )
    `)
    .eq("status", "published")
    .neq("slug", currentSlug);

  if (error) {
    throw error;
  }

  const related =
    (data ?? [])
      .map((article: any) => {
        const articleTags =
          article.article_tags?.flatMap(
            (item: any) => {
              if (Array.isArray(item.tags)) {
                return item.tags.map(
                  (tag: any) => tag.name
                );
              }

              return item.tags?.name
                ? [item.tags.name]
                : [];
            }
          ) ?? [];

        const score =
          articleTags.filter((tag: string) =>
            tags.includes(tag)
          ).length;

        return {
          ...article,
          score,
        };
      })
      .filter(
        (article: any) => article.score > 0
      )
      .sort(
        (a: any, b: any) =>
          b.score - a.score
      )
      .slice(0, 4);

  return related as HomepageArticle[];
}

export async function getArticlesByAuthor(
  authorSlug: string
): Promise<HomepageArticle[]> {
  const authorName = authorSlug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  const supabase = await createClient();

  const { data: author } = await supabase
    .from("authors")
    .select("id")
    .eq("name", authorName)
    .single();

  if (!author) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("author_id", author.id)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getIndexArticles(): Promise<
  HomepageArticle[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getSitemapArticles(): Promise<
  HomepageArticle[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published");

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}

export async function getRssArticles(): Promise<
  HomepageArticle[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    })
    .limit(100);

  if (error) {
    throw error;
  }

  return (data ?? []) as unknown as HomepageArticle[];
}