import { getCategoryName } from "@/lib/taxonomy/categories";
import { getSubcategoryName } from "@/lib/taxonomy/subcategories";
import { mapWpPostToHomepageArticle } from "@/lib/wordpress/mapper";
import { getMediaMap } from "@/services/public/wp-media";
import {
  getWpHomepagePosts,
  getWpPostsByTagId,
  getWpTagBySlug,
} from "@/services/public/wp-rest";

export type HomepageArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  published_at: string;
  is_top_story: boolean;
  is_must_read: boolean;

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

  tags: {
    name: string;
    slug: string;
  }[];

  media: {
    id: string;
    path: string;
    alt_text: string | null;
    title: string | null;
  } | null;
};

export type PublicArticle = HomepageArticle;

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

  return article;
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

export async function getArticlesByTag(
  tagSlug: string
): Promise<HomepageArticle[]> {
  const tag =
    await getWpTagBySlug(tagSlug);

  if (!tag) {
    return [];
  }

  const posts =
    await getWpPostsByTagId(tag.id);

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

export async function getRelatedArticles(
  currentSlug: string,
  currentSubcategorySlug: string | null,
  tags: {
    name: string;
    slug: string;
  }[]
): Promise<HomepageArticle[]> {
  const articles =
    await getHomepageSource();

  /*
   * Prioritas 1:
   * Tag yang sama
   */
  const relatedByTags =
    articles.filter(
      (article) =>
        article.slug !==
        currentSlug &&
        article.tags.some(
          (tag) =>
            tags.some(
              (
                currentTag
              ) =>
                currentTag.slug ===
                tag.slug
            )
        )
    );

  /*
   * Prioritas 2:
   * Subkategori yang sama
   */
  const relatedBySubcategory =
    currentSubcategorySlug
      ? articles.filter(
        (article) =>
          article.slug !==
          currentSlug &&
          article
            .subcategories
            ?.slug ===
          currentSubcategorySlug &&
          !relatedByTags.some(
            (
              item
            ) =>
              item.id ===
              article.id
          )
      )
      : [];

  /*
   * Prioritas 3:
   * Artikel terbaru
   */
  const fallback =
    articles.filter(
      (article) =>
        article.slug !==
        currentSlug &&
        !relatedByTags.some(
          (item) =>
            item.id ===
            article.id
        ) &&
        !relatedBySubcategory.some(
          (item) =>
            item.id ===
            article.id
        )
    );

  return [
    ...relatedByTags,
    ...relatedBySubcategory,
    ...fallback,
  ].slice(0, 3);
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

