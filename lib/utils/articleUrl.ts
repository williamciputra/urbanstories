import type { HomepageArticle } from "@/services/public/articles";

export function getArticlePath(
  article: Pick<
    HomepageArticle,
    "slug" | "categories" | "subcategories"
  >
) {
  const base =
    article.subcategories?.slug ??
    article.categories?.name.toLowerCase() ??
    "";

  return `/${base}/${article.slug}`;
}