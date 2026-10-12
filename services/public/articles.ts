import { getCategoryName } from "@/lib/taxonomy/categories";
import { SUBCATEGORY_SLUGS } from "@/lib/taxonomy/subcategories";
import { getSubcategoryName } from "@/lib/taxonomy/subcategories";
import { mapWpPostToHomepageArticle } from "@/lib/wordpress/mapper";
import { getMediaMap } from "@/services/public/wp-media";
import {
  getWpHomepagePosts,
  getWpPostsBySubcategorySlug,
  getWpSubcategoryPostsPage,
  getWpPostsByCategorySlug,
  getWpPostBySlug,
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
    slug: string;
    avatarUrl: string | null;
    bio: string | null;
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
    caption: string | null;
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
        caption:
          media.caption?.rendered ?? null,
      }
      : null;

    return article;
  });
}

export async function getArticleBySlug(
  slug: string
): Promise<PublicArticle | null> {
  const post =
    await getWpPostBySlug(slug);

  if (!post) {
    return null;
  }

  const article =
    mapWpPostToHomepageArticle(post);

  if (post.featured_image_url) {
    article.media = {
      id: String(post.featured_media),
      path: post.featured_image_url,
      alt_text:
        post.featured_image_alt ?? null,
      title: null,
      caption:
        post._embedded?.["wp:featuredmedia"]?.[0]?.caption?.rendered ?? null,
    };
  } else {
    article.media = null;
  }

  return article;
}

export async function getArticlesByCategory(
  category: string
): Promise<HomepageArticle[]> {
  const categoryName =
    getCategoryName(category) ?? category;

  const subcategories =
    SUBCATEGORY_SLUGS[
      category as keyof typeof SUBCATEGORY_SLUGS
    ];

  // Pertahankan perilaku kategori tanpa subkategori, termasuk Sports.
  if (!subcategories || Object.keys(subcategories).length === 0) {
    const posts =
      await getWpPostsByCategorySlug(category);

    const mediaIds = posts
      .map((post) => post.featured_media)
      .filter((id) => id > 0);

    const mediaMap = await getMediaMap(mediaIds);

    return posts
      .map((post) => {
        const article =
          mapWpPostToHomepageArticle(post);

        const media = mediaMap[post.featured_media];

        article.media = media
          ? {
              id: String(media.id),
              path: media.source_url,
              alt_text: media.alt_text ?? null,
              title: media.title.rendered ?? null,
              caption: media.caption?.rendered ?? null,
            }
          : null;

        return article;
      })
      .filter(
        (article) =>
          article.categories?.name === categoryName
      );
  }

  const subcategoryEntries = Object.keys(subcategories);

  const postsBySubcategory = await Promise.all(
    subcategoryEntries.map((subcategorySlug) =>
      getWpPostsBySubcategorySlug(subcategorySlug, 8)
    )
  );

  const articles = postsBySubcategory
    .flat()
    .map((post) => mapWpPostToHomepageArticle(post));

  // Pertahankan filter kategori induk dan hanya artikel yang
  // terpetakan ke salah satu subkategori resmi kategori ini.
  const allowedSubcategories = new Set(subcategoryEntries);

  return articles.filter(
    (article) =>
      article.categories?.name === categoryName &&
      article.subcategories !== null &&
      allowedSubcategories.has(article.subcategories.slug)
  );
}

export async function getSubcategoryArticlePage(
  categorySlug: string,
  subcategorySlug: string,
  page = 1,
  limit = 20
): Promise<{ articles: HomepageArticle[]; hasMore: boolean }> {
  const categoryName = getCategoryName(categorySlug);
  const subcategoryName = getSubcategoryName(categorySlug, subcategorySlug);

  if (
    !categoryName ||
    !subcategoryName ||
    !Number.isSafeInteger(page) ||
    page < 1
  ) {
    return { articles: [], hasMore: false };
  }

  const result = await getWpSubcategoryPostsPage(
    subcategorySlug,
    page,
    limit
  );

  const articles = result.posts
    .map((post) => mapWpPostToHomepageArticle(post))
    .filter(
      (article) =>
        article.categories?.name === categoryName &&
        article.subcategories?.name === subcategoryName
    );

  return {
    articles,
    hasMore: result.hasMore,
  };
}

export async function getArticlesBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Promise<HomepageArticle[]> {
  const result = await getSubcategoryArticlePage(
    categorySlug,
    subcategorySlug,
    1,
    20
  );

  return result.articles;
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
        caption: media.caption?.rendered ?? null,
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
  }[],
  articles: HomepageArticle[]
): Promise<HomepageArticle[]> {

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
  ].slice(0, 4);
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
      article.authors?.name
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === authorSlug
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

