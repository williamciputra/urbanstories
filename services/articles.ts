export type CreateArticlePayload = {
  title: string;
  slug: string;

  excerpt: string;
  content: string;

  category_id: string | null;
  subcategory_id: string | null;

  author_id: string | null;

  cover_image_id: string | null;

  status: "draft" | "scheduled" | "published" | "archived";

  published_at: string | null;
};

export async function createArticle(
  payload: CreateArticlePayload
) {
  const res = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error ?? "Failed to create article");
  }

  return res.json();
}