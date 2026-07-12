import { getCategoryName } from "@/lib/taxonomy/categories";
import { getSubcategoryName } from "@/lib/taxonomy/subcategories";
import { mapWpPostToHomepageArticle } from "@/lib/wordpress/mapper";
import { getMediaMap } from "@/services/public/wp-media";
import { getWpHomepagePosts } from "@/services/public/wp-rest";

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
    slug: string;
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

export async function getHomepageSource(): Promise<
  HomepageArticle[]
> {
  const posts =
    await getWpHomepagePosts();

  const mediaIds = posts
    .map((post) => post.featured_media)
    .filter((id) => id > 0);

  const mediaMap =
    await getMediaMap(mediaIds);

  return posts.map((post) => {
    const article =
      mapWpPostToHomepageArticle(post);

    const media =
      mediaMap[post.featured_media];

    article.media = media
      ? {
        id: String(media.id),
        path: media.source_url,
        alt_text:
          media.alt_text ?? null,
        title:
          media.title.rendered ??
          null,
      }
      : null;

    return article;
  });
}

export async function getArticleBySlug(
  slug: string
): Promise<PublicArticle | null> {
  const articles =
    await getHomepageSource();

  const article =
    articles.find(
      (item) => item.slug === slug
    );

  if (!article) {
    return null;
  }

  return {
    ...article,
    tags: [],
  };
}

export async function getArticlesByCategory(
  category: string
): Promise<HomepageArticle[]> {
  const categoryName =
    getCategoryName(category) ?? category;

  const articles =
    await getHomepageSource();

  return articles.filter(
    (article) =>
      article.categories?.name ===
      categoryName
  );
}

export async function getArticlesBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Promise<HomepageArticle[]> {
  const categoryName =
    getCategoryName(categorySlug);

  const subcategoryName =
    getSubcategoryName(
      categorySlug,
      subcategorySlug
    );

  if (
    !categoryName ||
    !subcategoryName
  ) {
    return [];
  }

  const articles =
    await getHomepageSource();

  return articles.filter(
    (article) =>
      article.categories?.name ===
      categoryName &&
      article.subcategories?.name ===
      subcategoryName
  );
}

export async function getRelatedArticles(
  currentSlug: string,
  tags: string[]
): Promise<HomepageArticle[]> {
  const articles =
    await getHomepageSource();

  return articles
    .filter(
      (article) =>
        article.slug !== currentSlug
    )
    .slice(0, 4);
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

  const articles =
    await getHomepageSource();

  return articles.filter(
    (article) =>
      article.authors?.name ===
      authorName
  );
}

export async function getIndexArticles(): Promise<
  HomepageArticle[]
> {
  return getHomepageSource();
}

export async function getSitemapArticles(): Promise<
  HomepageArticle[]
> {
  return getHomepageSource();
}

export async function getRssArticles(): Promise<
  HomepageArticle[]
> {
  return getHomepageSource();
}